const githubIntegration = require('../../integration/github/githubIntegration');

const getRepo = (user, repo) => new Promise((resolve, reject) => {
    githubIntegration.repo(user, repo).
    then((repoResponse) => {
        resolve(repoResponse);
    }).
    catch((error) => {
        reject(error);
    });
});

module.exports = { getRepo };
