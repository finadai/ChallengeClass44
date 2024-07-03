const User = require('../models/user');
const logger = require('../utils/logger');

exports.togglePremium = async (req, res, next) => {
    const { uid } = req.params;

    try {
        const user = await User.findById(uid);

        if (!user) {
            logger.warn(`User with id ${uid} not found`);
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = user.role === 'user' ? 'premium' : 'user';
        await user.save();

        logger.info(`User ${uid} role changed to ${user.role}`);
        res.status(200).json({ message: `User role changed to ${user.role}` });
    } catch (error) {
        logger.error(`Error changing user ${uid} role:`, error);
        next(error);
    }
};
