const bcrypt = require('bcryptjs');
const token = require('../auth/token');
const User = require('../models/user');
const AppError = require('../errors/AppError');
const AuthError = require('../errors/AuthError');
const DBError = require('../errors/DatabaseError');

const login = (email, password) => new Promise((resolve, reject) => {
        User.findOne({ email }, (error, user) => {

            if (error) {
                return reject(new DBError('Database Error', 500));
            }

            if (!user) {
                return reject(new AppError('User not found', 404));
            }

            if (!password) {
                return reject(new AuthError('Password required', 403));
            }

            const checkPass = bcrypt.compareSync(password, user.password);

            if (!checkPass) {
                return reject(new AuthError('Unauthorized', 403));
            }

            token(user._id)
            .then((userToken) => resolve(userToken))
            .catch((tokenError) => {
                return reject(new AuthError(tokenError.message, 500));
            });
        });
    });

module.exports = login;
