const dbName = process.env.DATABASE_NAME;
const dbServer = process.env.DATABASE_SERVER;
const dbURL = process.env.DATABASE_URL;
const dbUser = process.env.DATABASE_USER;
const dbPass = process.env.DATABASE_PASS;
const dbLocal = process.env.DATABASE_REPEAT_LOCAL;
const githubUser = process.env.GIT_USER;
const githubPass = process.env.GIT_PASS;
const tokenSecret = process.env.SECRET;

module.exports = {
    port: process.env.PORT || 5000,
    environment: process.env.ENV || '',
    database: {
        name: dbName || 'repeat-please-test',
        server: dbServer || 'Local Server',
        rawURL: dbURL || 'mongodb://localhost:27017/DATABASE_NAME',
        localURL: 'mongodb://localhost:27017/DATABASE_NAME',
        user: dbUser || '',
        pass: dbPass || '',
        repeatLocal: dbLocal || false
    },
    github: {
        user: githubUser,
        pass: githubPass
    },
    token: {
        secret: tokenSecret || 'secret',
        expires: 900,
        salt: 8
    }
};
