const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config/config');
const httpErrors = require('http-errors');
const log = require('../../config/logger');

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
            const appError = new Error('Token creation error');
            log.build(log.lv.ERROR, appError);
            return reject(httpErrors(500, appError.message));
        });
    },
    verify: (token, secret = config.token.secret, cb) => {

        jwt.verify(token, secret, (error, decoded) => {
            if (error) {
                log.build(log.lv.ERROR, error);
                return cb(httpErrors(401, `Invalid Token ${error.message}`));
            }
            return cb(null, decoded);
        });
    },
    checkPass: (userPass, comparePass) => {

        return new Promise((resolve, reject) => {
            bcrypt.compare(userPass, comparePass, (error, res) => {
                if (error) {
                    log.build(log.lv.ERROR, error);
                    return reject(httpErrors(500, error.message));
                }

                if (!res) {
                    const err = httpErrors(401, 'Unauthorized');
                    log.build(log.lv.ERROR, err);
                    return reject(err);
                }

                return resolve(res);
            });
        });
    },
    hash: (password, salt = config.token.salt) => {

        return new Promise((resolve, reject) => {
            bcrypt.hash(password, salt, (error, hashPass) => {
                if (error) {
                    log.build(log.lv.ERROR, error);
                    return reject(httpErrors(500, error.message));
                }

                return resolve(hashPass);
            });
        });
    }
};
