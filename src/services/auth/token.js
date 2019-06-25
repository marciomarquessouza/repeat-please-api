const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config/config');
const AuthError = require('../../exceptions/AuthException');

module.exports = {
   create: (userId, expiresIn = config.token.expires) => {
        const token = jwt.sign(
            { id: userId },
            config.token.secret,
            { expiresIn }
        );

        return new Promise((resolve, reject) => {
            if (token) {
                return resolve(token);
            }

            return reject(new AuthError('Token creation error', 500));
        });
    },
    verify: (token, secret = config.token.secret, callback) => {

        jwt.verify(token, secret, (error, decoded) => {
            if (error) {
                return callback(new AuthError('Invalid Token', 401));
            }

            return callback(null, decoded);
        });
    },
    checkPass: (userPass, comparePass) => {

        return new Promise((resolve, reject) => {
            bcrypt.compare(userPass, comparePass, (error, res) => {
                if (error) {
                    return reject(new AuthError(error.message, 500));
                }

                if (!res) {
                    return reject(new AuthError('Unauthorized', 401));
                }

                return resolve(res);
            });
        });
    },
    hash: (password, salt = config.token.salt) => {

        return new Promise((resolve, reject) => {
            bcrypt.hash(password, salt, (error, hashPass) => {
                if (error) {
                    return reject(new AuthError('Token error - hash', 500));
                }

                return resolve(hashPass);
            });
        });
    }
};