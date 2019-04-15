module.exports = class AuthError extends Error {
    constructor(message, code) {
        super(message);
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
        this.code = code || 403;
    }
};
