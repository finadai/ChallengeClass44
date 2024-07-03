const DaoFactory = require('../DAO/daoFactory');
const userDao = DaoFactory.getUserDao();
const UserDTO = require('../DTOS/user.dto');
const errorCodes = require('../utils/errorCodes');
const logger = require('../utils/logger');

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await userDao.findByEmail(email);
        
        if (!user || !(await user.comparePassword(password))) {
            logger.warn('Invalid login attempt');
            const error = new Error('Invalid credentials');
            error.code = 'INVALID_CREDENTIALS';
            throw error;
        }

        req.session.user = new UserDTO(user);

        logger.info('User logged in successfully');
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        logger.error('Error during login:', error);
        next(error);
    }
};

exports.logout = async (req, res, next) => {
    try {
        delete req.session.user;
        
        logger.info('User logged out successfully');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        logger.error('Error during logout:', error);
        next(error);
    }
};

exports.currentSession = async (req, res) => {
    if (req.session.user) {
        logger.info('Session retrieved successfully');
        res.json(req.session.user);
    } else {
        logger.warn('No active session found');
        res.status(401).json({ message: 'No active session' });
    }
};

