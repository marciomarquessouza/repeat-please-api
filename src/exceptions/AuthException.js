const logger = require('../config/logger');

module.exports = class AuthException extends Error {
    constructor(message, code = 403, level = 'error') {
        super(message);
        this.message = message;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
        logger[level](this.stack);
    }
};