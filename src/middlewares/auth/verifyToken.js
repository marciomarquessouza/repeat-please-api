const config = require('../../config/config');
const token = require('../../services/auth/token');
const httpErrors = require('http-errors');

module.exports = (req, res, next) => {

    const reqToken = req.headers['x-access-token'];

    if (!reqToken) {
        const error = httpErrors(401, 'Token was not found');
        return next(error);
    }

    const { secret } = config.token;

    token.verify(reqToken, secret, (err, decoded) => {

        if (err) {
            const appError = httpErrors(err.status, err.message);
            return next(appError);
        }

        req.userId = decoded.id;

        return next();
    });
};
