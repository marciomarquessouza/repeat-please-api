const request = require('request');
const githubParse = require('./parses/githubRepoParse');
const githubOptions = require('./githubOptions');
const httpErrors = require('http-errors');

const repo = function(user, repoName) {

    const url = `repos/${user}/${repoName}`;

    return new Promise((resolve, reject) => {
        const githubResponse = (error, response, body) => {
            try {
                if (!error && response.statusCode === 200) {
                    return resolve(githubParse(body));
                }
                const errBody = JSON.parse(body);
                /* eslint-disable max-len */
                const fullErr = `(User: ${user} | Repo: ${repoName}): ${errBody.message}`;
                throw new Error(fullErr);
            } catch (err) {
                const appError = httpErrors(502, err.message);
                return reject(appError);
            }
        };
        request.get(githubOptions(url), githubResponse);
    });
};

module.exports = { repo };
