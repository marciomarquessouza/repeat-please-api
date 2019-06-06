const login = require('./login');
const logout = require('./logout');
const register = require('./register');
const user = require('./user');

module.exports = {
    ...login,
    ...logout,
    ...register,
    ...user
};
