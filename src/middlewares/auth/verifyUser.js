const Response = require('../../models/responses/Response');

module.exports = (req, res, next) => {
    if (!req.body.email) {
        new Response(res, 'Email is required', 400).send();
    }

    if (!req.body.password) {
        new Response(res, 'Password is required', 400).send();
    }

    next();
};
