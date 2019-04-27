const request = require('request');
const githubParse = require('./parses/githubRepoParse');
const githubOptions = require('./githubOptions');

const repo = function(user, repoName) {

    const url = `repos/${user}/${repoName}`;

    return new Promise((resolve, reject) => {
        const githubResponse = (error, response, body) => {

            if (!error && response.statusCode === 200) {
                githubParse(
                    body,
                    (parseResponse, parseError) => parseError
                    ? reject(parseError)
                    : resolve(parseResponse)
                );
            } else {
                const errorBody = JSON.parse(body);
                const errorResponse = {
                    message: errorBody
                    ? `Github response: ${errorBody.message}`
                    : 'Github server error',
                    status: response.statusCode || 502
                };

                reject(errorResponse);
            }
        };

        request.get(githubOptions(url), githubResponse);
    });
};

module.exports = { repo };
