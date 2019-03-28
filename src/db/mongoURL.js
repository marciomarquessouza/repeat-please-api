const config = require('../config/config');
const DATABASE_URL = config.database.rawUrl;

module.exports = (dbName, dbUser, dbPass, rawURL = DATABASE_URL) => {

    const checkArgs =
    [dbName, dbUser, dbPass].filter((arg) => arg === undefined);

    if (checkArgs.length > 0) {
        throw new Error(`There're ${checkArgs.length} missing args`);
    }

    const dbParamenters = {
        DATABASE_NAME: dbName,
        DATABASE_USER: dbUser,
        DATABASE_PASS: dbPass
    };

    const reg = /DATABASE_USER|DATABASE_PASS|DATABASE_NAME/giu;

    return rawURL.replace(reg, (matched) => dbParamenters[matched]);
};
