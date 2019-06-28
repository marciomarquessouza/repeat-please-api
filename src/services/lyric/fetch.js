const { Lyric } = require('../../models/lyrics/Lyric');
const httpErrors = require('http-errors');

const fetch = async (query, body) => {
    const limit = parseInt(query.limit, 0) || 50;
    const skip = parseInt(query.skip, 0) || 0;
    try {
        const lyrics = await Lyric.find(body)
        .skip(skip)
        .limit(limit);
        if (lyrics.length < 1) {
            throw httpErrors(404, 'No Results');
        }
        return lyrics;
    } catch (err) {
        throw httpErrors(err.status, err.message);
    }
};

const fetchByID = async (_id) => {
    try {
        const lyric = await Lyric.findOne({ _id });
        if (!lyric) {
            throw httpErrors(404, 'No Results');
        }
        return lyric;
    } catch (err) {
        throw httpErrors(err.status, err.message);
    }
};

module.exports = {
    fetchByID,
    fetch
};
