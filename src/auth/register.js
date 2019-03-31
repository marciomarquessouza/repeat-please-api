const config = require('../config/config');
const bcrypt = require('bcryptjs');
const token = require('./token');
const User = require('../models/user');

const register = (email, name = '', password) => {

    return new Promise((resolve, reject) => {

        if (password === undefined) {
            return reject(new Error('Password is required'));
        }

        if (email === undefined) {
            return reject(new Error('Email is required'));
        }

        bcrypt.hash(password, config.token.salt, (hashError, hashPassword) => {

            if (hashError) {
                return reject(new Error('Token - hash error'));
            }

            User.create({
                email,
                name,
                password: hashPassword
            }, (dbError, user) => {

                if (dbError) return reject(new Error('Database error'));

                token(user._id)
                .then((userToken) => resolve(userToken))
                .catch(() => reject(new Error('Token error')));
            });
        });
    });
};

module.exports = register;
