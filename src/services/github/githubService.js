const github = require('../../integrations/github/githubIntegration');

const repository = (user, repo) => new Promise((resolve, reject) => {
    github.repo(user, repo).
    then((repoResponse) => {
        resolve(repoResponse);
    }).
    catch((error) => {
        reject(error);
    });
});

module.exports = { repository };
