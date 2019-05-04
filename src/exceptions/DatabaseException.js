const logger = require('../config/logger');

module.exports = class DatabaseException extends Error {
    constructor(message, code, level) {
        super(message);
        this.message = message;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
        logger[level](this.stack);
    }
};
