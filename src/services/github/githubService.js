const github = require('../../integrations/github/githubIntegration');

const repository = (user, repo) => new Promise((resolve, reject) => {
    github.repo(user, repo).
    then((repoResponse) => {
        return resolve(repoResponse);
    }).
    catch((error) => {
        return reject(error);
    });
});

module.exports = { repository };
