const User = require('../../models/users/User');
const httpErrors = require('http-errors');
const log = require('../../config/logger');

const user = (userId) => {
    return new Promise((resolve, reject) => {
        new User({ _id: userId })
        .findUserById()
        .then((fetchedUser) => {
            fetchedUser.password = undefined;
            return resolve(fetchedUser);
        })
        .catch((err) => {
            const appError = httpErrors(err.status, err.message);
            log.build(log.lv.ERROR, err);
            return reject(appError);
        });
    });
};

module.exports = { user };
