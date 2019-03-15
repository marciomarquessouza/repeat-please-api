const config = require('../../config/config');

const options = (url) => ({
    auth: {
        pass: config.github.pass,
        user: config.github.user
    },
    headers: {
        'User-Agent': 'request'
    },
    url: `https://api.github.com/${url}`
});

module.exports = options;
