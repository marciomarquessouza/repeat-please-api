require('dotenv').load();

const github = {
    pass: process.env.GIT_PASS,
    user: process.env.GIT_USER
};

const envConfig = {
    development: {
        app: {
            port: 8080
        },
        github,
        mongodb: {
            database: 'repeat-please-dev',
            url: 'mongodb://localhost:27017'
        },
        secret: process.env.secret
    },
    test: {
        app: {
            port: 8080
        },
        github,
        mongodb: {
            database: 'repeat-please-dev',
            url: 'mongodb://localhost:27017'
        },
        secret: process.env.secret
    },
    production: {
        app: {
            port: 8080
        },
        github,
        mongodb: {
            database: 'repeat-please-dev',
            url: 'mongodb://localhost:27017'
        },
        secret: process.env.secret
    }
};

module.exports = envConfig[process.env.environment];
