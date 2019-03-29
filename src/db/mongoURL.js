const config = require('../config/config');
const DATABASE_URL = config.database.rawURL;

module.exports = (
    rawURL = DATABASE_URL,
    dbName = '',
    dbUser = '',
    dbPass = ''
    ) => {

    const dbParamenters = {
        DATABASE_NAME: dbName,
        DATABASE_USER: dbUser,
        DATABASE_PASS: dbPass
    };

    const reg = /DATABASE_USER|DATABASE_PASS|DATABASE_NAME/giu;

    return rawURL.replace(reg, (matched) => dbParamenters[matched]);
};
