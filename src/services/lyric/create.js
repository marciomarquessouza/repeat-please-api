const AppError = require('../../exceptions/AppException');
const { Lyric } = require('../../models/lyrics/Lyric');
const http = require('../../helpers/httpCheck');
const logger = require('../../config/logger');

const create = async (body) => {
    try {
        const { title } = body;
        if (!title) {
            throw new AppError('Title is required', 502, 'error');
        }
        const lyric = await Lyric.create(body);
        logger.info(`Lyric "${lyric.title}" id: ${lyric._id} created`);
        return lyric;
    } catch (err) {
        const error = new AppError(
            err.message,
            http.check(err.code, 500),
            'error'
            );
        throw error;
    }
};

module.exports = { create };
