const config = require('../../config/config');
const token = require('../../auth/token');
const Response = require('../../models/responses/Response');

module.exports = (req, res, next) => {
    const reqToken = req.headers['x-access-token'];

    if (!reqToken) {
        return new Response(res, 'Token was not found', 403);
    }

    const { secret } = config.token;

    token.verify(reqToken, secret, (error, decoded) => {

        if (error) {
            return new Response(res, error.message, error.code).send();
        }

        req.userId = decoded.id;

        next();
    });
};
