const auth = require('../../auth/auth');
const Response = require('../../models/responses/Response');
const ErrorResponse = require('../../models/responses/ErrorResponse');

module.exports.login = (req, res) => {

    auth.login(
        req.body.email,
        req.body.password
    )
    .then((token) => {
        const response = new Response(res, 'Authorized', 200, true, token);
        response.send();
    })
    .catch((error) => {
        const code = error.code || 500;
        const message = error.message || 'Internal error';
        return new ErrorResponse(res, message, code).send();
    });
};
