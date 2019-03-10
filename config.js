require('dotenv').load();

module.exports = {
    app: {
        port: 8000
    },
    github: {
        user: process.env.GIT_USER,
        pass: process.env.GIT_PASS
    }
}