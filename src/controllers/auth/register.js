const authService = require('../../services/auth');

module.exports.register = (req, res, next) => {
    authService.register(
        req.body.email,
        req.body.name,
        req.body.password
        )
        .then(({ token, user }) => {
            res.locals.token = token;
            res.locals.body = user;
            return next();
        })
        .catch((err) => {
            return next(err);
        });
};
