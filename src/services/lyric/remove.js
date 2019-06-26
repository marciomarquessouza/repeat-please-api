const AppError = require('../../exceptions/AppException');
const { Lyric } = require('../../models/lyrics/Lyric');
const http = require('../../helpers/httpCheck');

const removeByID = async (_id) => {
    try {
        if (!_id) {
            throw new AppError('ID is required', 400, 'error');
        }

        const response = await Lyric.deleteOne({ _id });

        if (response.deletedCount < 1) {
            throw new AppError('Lyric not found', 404, 'error');
        }
        return response;
    } catch (err) {
        const appError = new AppError(
            err.message,
            http.check(err.code, 500),
            'error'
        );
        return appError;
    }
};

const removeList = async (ids) => {
    try {
        if (ids instanceof Array && ids.length > 0) {
            const response = await Lyric.deleteMany({ _id: { $in: ids }});
            return response;
        }

        throw new AppError('Body is required', 400, 'error');

    } catch (err) {
        const appError = new AppError(
            err.message,
            http.check(err.code, 500),
            'error'
        );
        return appError;
    }
};

module.exports = {
    removeByID,
    removeList
};
