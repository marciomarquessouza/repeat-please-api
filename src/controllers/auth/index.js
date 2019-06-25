const login = require('./login');
const register = require('./register');
const user = require('./user');

module.exports = {
    ...login,
    ...register,
    ...user
};
