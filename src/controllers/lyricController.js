const assert = require('assert');
const AppError = require('../exceptions/AppException');
const ErrorResponse = require('../models/responses/ErrorResponse');
const Response = require('../models/responses/Response');
const { Lyric } = require('../models/lyrics/Lyric');

module.exports.create = async (req, res) => {
    try {
        const { title } = req.body;
        assert.ok(title, 'Title is required');
        const lyric = new Lyric();
        const newLyric = await lyric.createLyric(req.body);
        return new Response(res, 'Created', 201, true, null, newLyric).send();
    } catch (err) {
        const appError = new AppError(err.message, 405, 'error');
        return new ErrorResponse(res, appError.message, appError.code).send();
    }
};
