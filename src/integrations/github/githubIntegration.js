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
                try {
                    const errorBody = JSON.parse(body);
                    const errorResponse = {
                        message: `Github response: ${errorBody.message}`,
                        code: response.statusCode
                    };

                    return reject(new IntegrationError(
                        errorResponse.message,
                        errorResponse.code
                        ));
                } catch (err) {
                    return reject(new IntegrationError(
                        err.message,
                        502
                        ));
                }
            }
        };

        request.get(githubOptions(url), githubResponse);
    });
};

module.exports = { repo };
