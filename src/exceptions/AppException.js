const logger = require('../config/logger');

module.exports = class AppException extends Error {
    constructor(message, code = 500, level = 'error') {
        super(message);
        this.message = message;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
        logger[level](this.stack);
    }
};
