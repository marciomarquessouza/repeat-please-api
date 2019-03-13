require('dotenv').load();

module.exports = {
    app: {
        port: 8080
    },
    github: {
        pass: process.env.GIT_PASS,
        user: process.env.GIT_USER
    }
};
