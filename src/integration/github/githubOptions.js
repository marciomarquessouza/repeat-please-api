const user = process.env.GIT_USER;
const pass = process.env.GIT_PASS;

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
