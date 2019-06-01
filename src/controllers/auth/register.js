const auth = require('../../auth/auth');
const Response = require('../../models/responses/Response');
const ErrorResponse = require('../../models/responses/ErrorResponse');

module.exports.register = (req, res) => {
    auth.register(
        req.body.email,
        req.body.name,
        req.body.password
        )
        .then((token) => {
            const response = new Response(res, 'Created', 201, true, token);
            response.send();
        })
        .catch((error) => {
            const code = error.code || 500;
            const message = error.message || 'Internal error';
            return new ErrorResponse(res, message, code).send();
        });
};
