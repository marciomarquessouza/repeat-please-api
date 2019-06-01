const githubService = require('../../services/github/githubService');
const Response = require('../../models/responses/Response');
const ErrorResponse = require('../../models/responses/ErrorResponse');

module.exports.repository = (req, res) => {
    githubService.repository(req.params.user, req.params.name)
    .then((repo) => {
        const response = new Response(res, 'ok', 200, true, null, repo);
        response.send();
    })
    .catch((error) => {
        const code = error.code || 500;
        const message = error.message || 'Internal error';
        return new ErrorResponse(res, message, code).send();
    });
};
