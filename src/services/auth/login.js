const token = require('./token');
const User = require('../../models/users/User');

const login = (email, password) => {
    return new Promise((resolve, reject) => {
        new User({ email })
        .findUserByEmail()
        .then((user) => {
            return token
            .checkPass(password, user.password)
            .then(() => user);
        })
        .then((user) => {
            user.password = undefined;
            return token
            .create(user._id)
            .then((userToken) => resolve({
                token: userToken,
                user
            }));
        })
        .catch((error) => reject(error));
    });
};

module.exports = { login };
