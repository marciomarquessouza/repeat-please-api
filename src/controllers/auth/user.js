const auth = require('../../auth/auth');
const Response = require('../../models/responses/Response');
const ErrorResponse = require('../../models/responses/ErrorResponse');

module.exports.user = (req, res) => {
    auth.user(req.userId)
    .then((fetchedUser) => {
        const token = req.headers['x-access-token'];
        const response =
            new Response(res, 'Authorized', 200, true, token, fetchedUser);
        response.send();
    })
    .catch((error) => {
        const code = error.code || 500;
        const message = error.message || 'Internal error';
        return new ErrorResponse(res, message, code).send();
    });
};
