const register = require('../auth/register');
const login = require('../auth/login');
const logout = require('../auth/logout');
const user = require('../auth/user');
const authRes = require('../auth/authResponse');

exports.register = (req, res) => {
    register(
        req.body.email,
        req.body.name,
        req.body.password
        )
        .then((token) => {
            authRes(res, 'Created', 201, true, token);
        })
        .catch((error) => {
            const type = {
                '403': (message) => authRes(res, message, 403),
                '500': (message) => authRes(res, message, 500),
                'default': () => authRes(res, 'Internal error', 500)
            };

            (type[error.status.toString()] || type.default)(error.message);
        });
};

exports.login = (req, res) => {
    login(
        req.body.email,
        req.body.password
    )
    .then((token) => {
        authRes(res, 'Authorized', 200, true, token);
    })
    .catch((error) => {
        const type = {
            '403': (message) => authRes(res, message, 403),
            '404': (message) => authRes(res, message, 404),
            '500': (message) => authRes(res, message, 500),
            'default': () => authRes(res, 'Internal error', 500)
        };

        (type[error.status.toString()] || type.default)(error.message);
    });
};

exports.logout = logout;
exports.user = user;
