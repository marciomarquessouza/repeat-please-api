const token = require('./token');
const User = require('../../models/users/User');
const AppError = require('../../exceptions/AppException');
const http = require('../../helpers/httpCheck');

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
        .catch((error) => {
            const appError = new AppError(
                error.message,
                http.check(error.code, 500),
                'error'
            );
            return reject(appError);
        });
    });
};

module.exports = { register };
