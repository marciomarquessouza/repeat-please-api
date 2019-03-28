const config = require('../../config/config');
const { user, pass } = config.github;

const options = (url) => ({
    auth: {
        pass,
        user
    },
    headers: {
        'User-Agent': 'request'
    },
    url: `https://api.github.com/${url}`
});

module.exports = options;
