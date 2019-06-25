const authService = require('../../services/auth');

module.exports.user = async (req, res, next) => {
    try {
        const user = await authService.user(req.userId);
        const token = req.headers['x-access-token'];
        res.locals.token = token;
        res.locals.body = user;
        return next();
    } catch (err) {
        return next(err);
    }
};
