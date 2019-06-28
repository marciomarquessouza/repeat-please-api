const token = require('./token');
const User = require('../../models/users/User');
const httpErrors = require('http-errors');
const log = require('../../config/logger');

const register = (email, name, password) => {

    return new Promise((resolve, reject) => {
        token.hash(password)
        .then((hashPass) => ({
            email,
            name,
            password: hashPass
        }))
        .then((userData) => {
            return new User(userData)
            .createUser()
            .then((user) => user);
        })
        .then((user) => {
            user.password = undefined;
            return token
            .create(user.id)
            .then((userToken) => resolve({
                token: userToken,
                user
            }));
        })
        .catch((err) => {
            log.build(log.lv.ERROR, err);
            const appError = httpErrors(err.status, err.message);
            return reject(appError);
        });
    });
};

module.exports = { register };
