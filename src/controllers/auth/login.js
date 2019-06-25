const authService = require('../../services/auth');

module.exports.login = async (req, res, next) => {
    try {
        const { token, user } = await authService.login(
            req.body.email,
            req.body.password
        );
        res.locals.token = token;
        res.locals.body = user;
        return next();
    } catch (err) {
        return next(err);
    }
};
