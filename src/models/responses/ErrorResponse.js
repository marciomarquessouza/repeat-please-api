const Response = require('./Response');

class ErrorResponse extends Response {
    constructor(
        res,
        message = 'Server Error',
        status = 500,
        auth = false,
        token = null,
        body = null
    ) {
        super(res, message, status, auth, token, body);
    }
}

module.exports = ErrorResponse;
