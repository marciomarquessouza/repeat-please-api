const { Lyric } = require('../../models/lyrics/Lyric');
const httpErrors = require('http-errors');

const removeByID = async (_id) => {
    try {
        if (!_id) {
            throw httpErrors(400, 'ID is required');
        }

        const response = await Lyric.deleteOne({ _id });

        if (response.deletedCount < 1) {
            throw httpErrors(404, 'Lyric not found');
        }
        return response;
    } catch (err) {
        throw httpErrors(err.status, err.message);
    }
};

const removeList = async (ids) => {
    try {
        if (ids instanceof Array && ids.length > 0) {
            const response = await Lyric.deleteMany({ _id: { $in: ids }});
            return response;
        }

        throw httpErrors(400, 'Body is required');

    } catch (err) {
        throw httpErrors(err.status, err.message);
    }
};

module.exports = {
    removeByID,
    removeList
};
