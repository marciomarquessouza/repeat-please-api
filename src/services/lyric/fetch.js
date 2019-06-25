const AppError = require('../../exceptions/AppException');
const { Lyric } = require('../../models/lyrics/Lyric');
const http = require('../../helpers/httpCheck');

const fetch = async (query, body) => {
    const limit = parseInt(query.limit, 0) || 50;
    const skip = parseInt(query.skip, 0) || 0;
    try {
        const lyrics = await Lyric.find(body)
        .skip(skip)
        .limit(limit);
        if (lyrics.length < 1) {
            throw new AppError('No Results', 404, 'error');
        }
        return lyrics;
    } catch (err) {
        err.code = http.check(err.code, 502);
        throw err;
    }
};

const fetchByID = async (_id) => {
    try {
        const lyric = await Lyric.findOne({ _id });
        if (!lyric) {
            throw new AppError('Lyric not Found', 404, 'error');
        }
        return lyric;
    } catch (err) {
        err.code = http.check(err.code, 502);
        throw err;
    }
};

module.exports = {
    fetchByID,
    fetch
};
