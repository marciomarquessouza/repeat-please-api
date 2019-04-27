const token = require('../auth/token');
const User = require('../models/users/User');
const logger = require('../config/winston');

module.exports = (email, password) => {
    return new Promise((resolve, reject) => {

        new User({ email })
        .findUserByEmail()
        .then((user) => {
            return token
            .checkPass(password, user.password)
            .then(() => user);
        })
        .then((user) => {
            return token
            .create(user._id)
            .then((userToken) => resolve(userToken));
        })
        .catch((error) => reject(error));
    });
};
