const assert = require('assert');
const AppError = require('../exceptions/AppException');
const ErrorResponse = require('../models/responses/ErrorResponse');
const Response = require('../models/responses/Response');
const { Lyric } = require('../models/lyrics/Lyric');

module.exports.create = async (req, res) => {
    try {
        const { title } = req.body;
        assert.notEqual(null, title, new AppError('Title is required', 405));
        const lyric = new Lyric();
        const newLyric = await lyric.createLyric(req.body);
        return new Response(res, 'Created', 201, true, null, newLyric).send();
    } catch (err) {
        return new ErrorResponse(res, err.message, err.code).send();
    }
};
