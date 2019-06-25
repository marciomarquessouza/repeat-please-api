const config = require('../../config/config');
const token = require('../../services/auth/token');
const AppError = require('../../exceptions/AppException');

module.exports = (req, res, next) => {

    const reqToken = req.headers['x-access-token'];

    if (!reqToken) {
        const error = new AppError('Token was not found', 401, 'error');
        return next(error);
    }

    const { secret } = config.token;

    token.verify(reqToken, secret, (error, decoded) => {

        if (error) {
            const err = new AppError(
                `Token was not validated: ${error.message}`,
                401,
                'error'
                );
            return next(err);
        }

        req.userId = decoded.id;

        return next();
    });
};
