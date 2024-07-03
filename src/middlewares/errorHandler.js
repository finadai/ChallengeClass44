const errorCodes = require('../utils/errorCodes');

const errorHandler = (err, req, res, next) => {
    console.error(err);
    const error = errorCodes[err.code] || errorCodes.SERVER_ERROR;
    res.status(500).json({ code: error.code, message: error.message });
};

module.exports = errorHandler;
