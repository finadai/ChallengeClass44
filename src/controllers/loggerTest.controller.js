const logger = require('../utils/logger');

exports.testLogger = (req, res) => {
    logger.debug('This is a debug message');
    logger.http('This is an http message');
    logger.info('This is an info message');
    logger.warn('This is a warning message');
    logger.error('This is an error message');
    logger.fatal('This is a fatal message');

    res.send('Logger test complete. Check your console and log files.');
};
