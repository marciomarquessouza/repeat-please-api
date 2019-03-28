const bcrypt = require('bcryptjs');
const token = require('../auth/token');
const User = require('../models/user');

const login = (req, res) => User.
findOne({ email: req.body.email }, (error, user) => {
    if (error) {
        return res.status(500).json({
            auth: false,
            code: 500,
            message: 'Server error trying to find the user',
            token: null
        });
    }

    if (!user) {
        return res.status(404).json({
            auth: false,
            code: 404,
            message: 'User not found',
            token: null
        });
    }

    const checkPass = bcrypt.compareSync(req.body.password, user.password);

    if (!checkPass) {
        return res.status(403).json({
            auth: false,
            code: 403,
            message: 'Unauthorized',
            token: null
        });
    }

    token(user._id)
    .then((userToken) => {
        return res.status(200).json({
            auth: true,
            message: 'Authenticated',
            token: userToken
        });
    })
    .catch((tokenError) => {
        return res.status(500).json({
            auth: false,
            message: tokenError,
            token: null
        });
    });
});

module.exports = login;
