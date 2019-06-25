const AppError = require('../../exceptions/AppException');

module.exports = (req, res, next) => {
    if (!req.body.email) {
        const error = new AppError('Email is required', 400, 'error');
        return next(error);
    }

    if (!req.body.password) {
        const error = new AppError('Password is required', 400, 'error');
        return next(error);
    }

    return next();
};
