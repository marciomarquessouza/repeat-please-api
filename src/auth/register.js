const token = require('./token');
const User = require('../models/users/User');

module.exports = (email, name, password) => {

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
            .then(({ id }) => id);
        })
        .then((id) => {
            return token
            .create(id)
            .then((userToken) => resolve(userToken));
        })
        .catch((error) => {
            return reject(error);
        });
    });
};
