const lyricService = require('../../services/lyric');

module.exports.update = async (req, res, next) => {
    try {
        const lyric = await lyricService.update(req.params.id, req.body);
        res.locals.body = lyric;
        return next();
    } catch (err) {
        return next(err);
    }
};
