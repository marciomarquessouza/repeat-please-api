const AppError = require('../../exceptions/AppException');
const { Lyric } = require('../../models/lyrics/Lyric');

const update = async (query, newLyric, returnUpdated = true) => {
    try {
        if (!query) {
            throw new AppError('ID is required', 400, 'error');
        }
        if (!newLyric) {
            throw new AppError('New Lyric is required', 400, 'error');
        }
        const lyric = await Lyric.findOneAndUpdate(
            query,
            { $set: newLyric },
            { new: returnUpdated }
        );
        if (!lyric) {
            throw new AppError('Lyric not Found', 404, 'error');
        }
        return lyric;
    } catch (err) {
        throw err;
    }
};

module.exports = { update };
