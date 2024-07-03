const User = require('../models/user');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const logger = require('../utils/logger');


exports.requestReset = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            logger.warn(`User with email ${email} not found`);
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hour

        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            html: `
                <p>You requested a password reset</p>
                <p>Click this <a href="http://localhost:9090/reset/${resetToken}">link</a> to set a new password.</p>
                <p>This link is valid for 1 hour.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        logger.info(`Password reset email sent to ${email}`);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        logger.error('Error requesting password reset:', error);
        next(error);
    }
};

exports.resetPassword = async (req, res, next) => {
    const { resetToken, newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetToken,
            resetTokenExpiration: { $gt: Date.now() }
        });

        if (!user) {
            logger.warn('Invalid or expired token');
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const isSamePassword = await user.comparePassword(newPassword);
        if (isSamePassword) {
            logger.warn('Cannot use the same password as current');
            return res.status(400).json({ message: 'Cannot use the same password as current' });
        }

        user.password = newPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        logger.info('Password reset successful');
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        logger.error('Error resetting password:', error);
        next(error);
    }
};
