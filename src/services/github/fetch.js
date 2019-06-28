const github = require('../../integrations/github/githubIntegration');
const httpError = require('http-errors');
const log = require('../../config/logger');

const fetch = (user, repo) => new Promise((resolve, reject) => {
    github.repo(user, repo)
    .then((repoResponse) => {
        return resolve(repoResponse);
    })
    .catch((err) => {
        log.build(log.lv.ERROR, err);
        const appError = httpError(err.status, err.message);
        return reject(appError);
    });
});

module.exports = { fetch };
