const ErrorResponse = require('../../models/responses/ErrorResponse');
const Response = require('../../models/responses/Response');
const lyricService = require('../../services/lyric');

module.exports.update = async (req, res) => {
    try {
        const lyric = await lyricService.update(req.params.id, req.body);
        return new Response(res, 'Updated', 200, true, null, lyric).send();
    } catch (err) {
        return new ErrorResponse(
            res,
            err.message || 'server error',
            err.code || 500
            ).send();
    }
};
