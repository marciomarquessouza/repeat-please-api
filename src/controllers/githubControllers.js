const githubService = require('../services/github/githubService');
const Response = require('../models/responses/Response');

module.exports.repository = (req, res) => {
    githubService.repository(req.params.user, req.params.name)
    .then((repo) => {
        const response = new Response(res, 'ok', 200, true, null, repo);
        response.send();
    })
    .catch((error) => {
        const type = {
            '401': (err) => new Response(res, err.message, 401).send(),
            '403': (err) => new Response(res, err.message, 403).send(),
            '404': (err) => new Response(res, err.message, 404).send(),
            '500': (err) => new Response(res, err.message, 500).send(),
            '502': (err) => new Response(res, err.message, 502).send(),
            'default':
                (err) => new Response(res, err.message || 'Internal error', 502)
                .send()
        };

        (type[error.code] || type.default)(error);
    });
};
