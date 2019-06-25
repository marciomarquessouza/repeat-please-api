const User = require('../../models/users/User');
const AppError = require('../../exceptions/AppException');
const http = require('../../helpers/httpCheck');

const user = (userId) => {
    return new Promise((resolve, reject) => {
        new User({ _id: userId })
        .findUserById()
        .then((fetchedUser) => {
            fetchedUser.password = undefined;
            return resolve(fetchedUser);
        })
        .catch((err) => {
            const appError = new AppError(
                err.message,
                http.check(err.code, 500),
                'error'
            );
            return reject(appError);
        });
    });
};

module.exports = { user };
