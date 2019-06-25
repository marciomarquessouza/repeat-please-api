const lyricService = require('../../services/lyric');

module.exports.fetch = async (req, res, next) => {
    try {
        if (req.params.id) {
            const lyric = await lyricService.fetchByID(req.params.id);
            res.locals.body = lyric;
            return next();
        }
        const lyrics = await lyricService.fetch(req.query, req.body);
        res.locals.body = lyrics;
        return next();
    } catch (err) {
        return next(err);
    }
};
