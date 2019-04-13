const config = require('../config/config');
const bcrypt = require('bcryptjs');
const token = require('./token');
const User = require('../db/models/users/user');
const AuthError = require('../errors/AuthError');
const DBError = require('../errors/DatabaseError');

const register = (email, name = '', password) => {

    return new Promise((resolve, reject) => {

        if (password === undefined) {
            return reject(new AuthError('Password is required', 403));
        }

        if (email === undefined) {
            return reject(new AuthError('Email is required', 403));
        }

        bcrypt.hash(password, config.token.salt, (hashError, hashPassword) => {

            if (hashError) {
                return reject(new AuthError('Token - hash error', 403));
            }

            User.create({
                email,
                name,
                password: hashPassword
            }, (dbError, user) => {

                if (dbError) return reject(new DBError('Database error', 500));

                token(user._id)
                .then((userToken) => resolve(userToken))
                .catch(() => reject(new AuthError('Token error', 403)));
            });
        });
    });
};

module.exports = register;
