const lyricService = require('../../services/lyric');

module.exports.remove = async (req, res, next) => {
    try {
        if (req.params.id) {
            const response = await lyricService.removeByID(req.params.id);
            res.locals.body = response;
            return next();
        }
        const response = await lyricService.removeList(req.body.ids);
        res.locals.body = response;
        return next();

    } catch (err) {
        return next(err);
    }
};
