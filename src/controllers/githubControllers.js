const githubService = require('../services/github/githubService');

module.exports.repository = (req, res) => {
    githubService.repository(req.params.user, req.params.name)
    .then((repo) => {
        res.status(200).json(repo);
    })
    .catch((error) => {
        const type = {
            '401': (err) => res.status(401).json(err.message),
            '403': (err) => res.status(403).json(err.message),
            '404': (err) => res.status(404).json(err.message),
            '500': (err) => res.status(500).json(err.message),
            '502': (err) => res.status(502).json(err.message),
            'default':
                (err) => res.status(err.status || 500)
                .send(err.message || 'Internal error')
        };

        (type[error.status.toString()] || type.default)(error);
    });
};
