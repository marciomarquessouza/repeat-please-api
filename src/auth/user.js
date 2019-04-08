const User = require('../models/users/user');
const AppError = require('../errors/AppError');

module.exports = (userId) => User.findOne({
    _id: userId
}, { password: 0 }, (error, user) => {
    return new Promise((resolve, reject) => {
        if (error) {
            return reject(new AppError('User not found', 404));
        }
        resolve({ ...user });
        });
});

