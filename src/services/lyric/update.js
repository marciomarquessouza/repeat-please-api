const { Lyric } = require('../../models/lyrics/Lyric');
const httpErrors = require('http-errors');

const update = async (query, newLyric, returnUpdated = true) => {
    try {
        if (!query) {
            throw httpErrors(400, 'ID is required');
        }
        if (!newLyric) {
            throw httpErrors(400, 'New Lyric is required');
        }
        const lyric = await Lyric.findOneAndUpdate(
            query,
            { $set: newLyric },
            { new: returnUpdated }
        );
        if (!lyric) {
            throw httpErrors(404, 'Lyric not Found');
        }
        return lyric;
    } catch (err) {
        throw httpErrors(err.status, err.message);
    }
};

module.exports = { update };
