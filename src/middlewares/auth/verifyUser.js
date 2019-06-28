const httpErrors = require('http-errors');

module.exports = (req, res, next) => {
    if (!req.body.email) {
        const error = httpErrors(400, 'Email is required');
        return next(error);
    }

    if (!req.body.password) {
        const error = httpErrors(400, 'Password is required');
        return next(error);
    }

    return next();
};
