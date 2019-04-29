const Response = require('../../models/responses/Response');

module.exports = (req, res, next) => {
    if (!req.body.email) {
        return new Response(res, 'Email is required', 400).send();
    }

    if (!req.body.password) {
        return new Response(res, 'Password is required', 400).send();
    }

    next();
};
