const User = require('../models/users/User');

module.exports = (userId) => {
    return new Promise((resolve, reject) => {
        new User({ _id: userId })
        .findUserById()
        .then((user) => {
            user.password = undefined;

            return resolve(user);
        })
        .catch((error) => {
            return reject(error);
        });
    });
};
