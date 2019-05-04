const auth = require('../auth/auth');
const Response = require('../models/responses/Response');

module.exports.register = (req, res) => {
    auth.register(
        req.body.email,
        req.body.name,
        req.body.password
        )
        .then((token) => {
            const response = new Response(res, 'Created', 201, true, token);
            response.send();
        })
        .catch((error) => {
            const type = {
                '401': (message) => new Response(res, message, 401).send(),
                '500': (message) => new Response(res, message, 500).send(),
                'default': () => new Response(res, 'Server Error', 500).send()
            };

            (type[error.code] || type.default)(error.message);
        });
};

module.exports.login = (req, res) => {

    auth.login(
        req.body.email,
        req.body.password
    )
    .then((token) => {
        const response = new Response(res, 'Authorized', 200, true, token);
        response.send();
    })
    .catch((error) => {
        const type = {
            '401': (message) => new Response(res, message, 401).send(),
            '404': (message) => new Response(res, message, 404).send(),
            '500': (message) => new Response(res, message, 500).send(),
            'default': () => new Response(res, 'Internal error', 500).send()
        };

        (type[error.code] || type.default)(error.message);
    });
};

module.exports.user = (req, res) => {
    auth.user(req.userId)
    .then((fetchedUser) => {
        const token = req.headers['x-access-token'];
        const response =
            new Response(res, 'Authorized', 200, true, token, fetchedUser);
        response.send();
    })
    .catch((error) => {
        const type = {
            '404': (message) => new Response(res, message, 404).send(),
            'default': () => new Response(res, 'Internal error', 500).send()
        };

        (type[error.code] || type.default)(error.message);
    });
};

module.exports.logout = (req, res) => {
    const response = new Response(res, 'Logout', 200, true);
    response.send();
};
