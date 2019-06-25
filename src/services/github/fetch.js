const github = require('../../integrations/github/githubIntegration');
const AppError = require('../../exceptions/AppException');
const http = require('../../helpers/httpCheck');

const fetch = (user, repo) => new Promise((resolve, reject) => {
    github.repo(user, repo).
    then((repoResponse) => {
        return resolve(repoResponse);
    }).
    catch((error) => {
        const appError = new AppError(
            error.message || 'Internal Server error',
            http.check(error.code, 500),
            'error'
        );
        return reject(appError);
    });
});

module.exports = { fetch };
