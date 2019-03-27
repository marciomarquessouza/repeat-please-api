const config = require('../config/config');
const DATABASE_URL = config.database.rawUrl;

module.exports = (dbName, dbUser, dbPass, rawURL = DATABASE_URL) => {

    const dbParamenters = {
        DATABASE_NAME: dbName,
        DATABASE_USER: dbUser,
        DATABASE_PASS: dbPass
    };

    const reg = /DATABASE_USER|DATABASE_PASS|DATABASE_NAME/giu;

    return rawURL.replace(reg, (matched) => dbParamenters[matched]);
};
