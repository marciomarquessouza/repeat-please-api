const githubService = require('../../services/github');

module.exports.repository = async (req, res, next) => {
    try {
        const { user, name } = req.params;
        const repo = await githubService.fetch(user, name);
        res.locals.body = repo;
        return next();
    } catch (err) {
        return next(err);
    }
};
