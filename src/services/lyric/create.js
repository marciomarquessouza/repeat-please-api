const { Lyric } = require('../../models/lyrics/Lyric');
const httpErrors = require('http-errors');
const logger = require('../../config/logger');

const create = async (body) => {
    try {
        const { title } = body;
        if (!title) {
            throw httpErrors(400, 'Title is required');
        }
        const lyric = await Lyric.create(body);
        logger.info(`Lyric "${lyric.title}" id: ${lyric._id} created`);
        return lyric;
    } catch (err) {
        const appError = httpErrors(err.status, err.message);
        throw appError;
    }
};

module.exports = { create };
