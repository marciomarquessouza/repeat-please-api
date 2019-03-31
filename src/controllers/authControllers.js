const register = require('../auth/register');
const login = require('../auth/login');
const logout = require('../auth/logout');
const user = require('../auth/user');

exports.register = ((req, res) => {
    register(
        req.body.email,
        req.body.name,
        req.body.password
        )
        .then((token) => {
            res.status(201).json({
                auth: true,
                message: 'Authorized',
                token
            });
        })
        .catch((error) => {
            res.status(500).json({
                auth: false,
                message: error.message,
                token: null
            });
        });
});

exports.login = login;
exports.logout = logout;
exports.user = user;
