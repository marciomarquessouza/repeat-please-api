const logger = require('../config/logger');

module.exports = class IntegrationException extends Error {
    constructor(message, code = 502, level = 'error') {
        super(message);
        this.message = message;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
        logger[level](this.stack);
    }
};
