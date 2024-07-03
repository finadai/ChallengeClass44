const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
        }),
        new transports.File({ filename: 'errors.log', level: 'error' })
    ]
});

module.exports = logger;
