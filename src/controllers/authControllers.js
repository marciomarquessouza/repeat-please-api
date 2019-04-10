const register = require('../auth/register');
const login = require('../auth/login');
const user = require('../auth/user');
const Auth = require('../auth/vo/AuthResponse');

const authRes =
    (response, auth) => response
    .status(auth.status)
    .json(auth.response);

module.exports.register = (req, res) => {
    register(
        req.body.email,
        req.body.name,
        req.body.password
        )
        .then((token) => {
            const auth = new Auth('Created', 201, true, token);
            authRes(res, auth);
        })
        .catch((error) => {
            const type = {
                '403': (message) => authRes(res, new Auth(message, 403)),
                '500': (message) => authRes(res, new Auth(message, 500)),
                'default': () => authRes(res, new Auth('Server Error', 500))
            };

            (type[error.status.toString()] || type.default)(error.message);
        });
};

module.exports.login = (req, res) => {
    login(
        req.body.email,
        req.body.password
    )
    .then((token) => {
        const auth = new Auth('Authorized', 200, true, token);
        authRes(res, auth);
    })
    .catch((error) => {
        const type = {
            '403': (message) => authRes(res, new Auth(message, 403)),
            '404': (message) => authRes(res, new Auth(message, 404)),
            '500': (message) => authRes(res, new Auth(message, 500)),
            'default': () => authRes(res, new Auth('Internal error', 500))
        };

        (type[error.status.toString()] || type.default)(error.message);
    });
};

module.exports.user = (req, res) => {
    user(req.userId)
    .then((fetchedUser) => {
        const token = req.headers['x-access-token'];
        const auth = new Auth('Authorized', 200, true, token, fetchedUser);
        authRes(res, auth);
    })
    .catch((error) => {
        const type = {
            '404': (message) => authRes(res, new Auth(message, 404)),
            'default': () => authRes(res, new Auth('Internal error', 500))
        };

        (type[error.status.toString()] || type.default)(error.message);
    });
};

module.exports.logout = (req, res) => {
    const auth = new Auth('Logout', 200, true);
    authRes(res, auth);
};
