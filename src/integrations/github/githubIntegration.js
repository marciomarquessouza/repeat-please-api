const request = require('request');
const githubParse = require('./parses/githubRepoParse');
const githubOptions = require('./githubOptions');
const IntegrationError = require('../../exceptions/IntegrationException');

const repo = function(user, repoName) {

    const url = `repos/${user}/${repoName}`;

    return new Promise((resolve, reject) => {
        const githubResponse = (error, response, body) => {

            if (!error && response.statusCode === 200) {
                githubParse(
                    body,
                    (parseError, parseResponse) => {
                        if (parseError) {
                            return reject(parseError);
                        }
                        return resolve(parseResponse);
                    }
                );
            } else {
                const errorBody = JSON.parse(body);
                const errorResponse = {
                    message: errorBody
                    ? `Github response: ${errorBody.message}`
                    : 'Github server error',
                    code: response.statusCode || 502
                };

                return reject(new IntegrationError(
                    errorResponse.message,
                    errorResponse.code
                    ));
            }
        };

        request.get(githubOptions(url), githubResponse);
    });
};

module.exports = { repo };
