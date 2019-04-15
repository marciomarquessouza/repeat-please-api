module.exports = class DatabaseError extends Error {
    constructor(message, code) {
        super(message);
        this.message = this.message;
        Error.captureStackTrace(this, this.constructor);
        this.code = code || 500;
    }
};
