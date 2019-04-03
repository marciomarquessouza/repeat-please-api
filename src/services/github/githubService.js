const githubIntegration = require('../../integration/github/githubIntegration');

const repository = (user, repo) => new Promise((resolve, reject) => {
    githubIntegration.repo(user, repo).
    then((repoResponse) => {
        resolve(repoResponse);
    }).
    catch((error) => {
        reject(error);
    });
});

module.exports = { repository };
