const AppError = require('../../exceptions/AppException');
const ErrorResponse = require('../../models/responses/ErrorResponse');
const Response = require('../../models/responses/Response');
const lyricService = require('../../services/lyric');

module.exports.create = async (req, res) => {
    try {
        const lyric = await lyricService.create(req.body);
        return new Response(res, 'Created', 201, true, null, lyric).send();
    } catch (err) {
        const appError = new AppError(err.message, 405, 'error');
        return new ErrorResponse(res, appError.message, appError.code).send();
    }
};
