const lyricService = require('../../services/lyric');

module.exports.create = async (req, res, next) => {
    try {
        const lyric = await lyricService.create(req.body);
        res.locals.body = lyric;
        return next();
    } catch (err) {
        return next(err);
    }
};
