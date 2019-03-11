
const request = require('request');
const config = require('../../config');

const getGithub = function(user, repo) {
    return new Promise((resolve, reject) => {

        const options = {
            auth: {
                pass: config.github.pass,
                user: config.github.user
            },
            headers: {
                'User-Agent': 'request'
            },
            url: `https://api.github.com/repos/${user}/${repo}`
        };

        const githubResponse = (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    resolve(JSON.parse(body));
                } else {
                    reject(error);
                }
        };

        request(options, githubResponse);
    });
};

module.exports = getGithub;
