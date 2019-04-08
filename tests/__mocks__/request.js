const githubResponse = require('./githubResponse.json');

const request = (url, callback) => {
    const response = { statusCode: 200 };
    const githubString = JSON.stringify(githubResponse);
    return callback(null, response, githubString);
};

module.exports = request;
