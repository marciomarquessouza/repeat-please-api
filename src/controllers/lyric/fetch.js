const ErrorResponse = require('../../models/responses/ErrorResponse');
const Response = require('../../models/responses/Response');
const lyricService = require('../../services/lyric');

module.exports.fetch = async (req, res) => {
    try {
        if (req.params.id) {
            const lyric = await lyricService.fetchByID(req.params.id);
            return new Response(res, 'Fetched', 200, true, null, lyric).send();
        }
        const lyrics = await lyricService.fetch(req.query, req.body);
        return new Response(res, 'Fetched', 200, true, null, lyrics).send();
    } catch (err) {
        return new ErrorResponse(
            res,
            err.message || 'server error',
            err.code || 500
            ).send();
    }
};
