const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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

    const secret = process.env.SECRET;

    const token = jwt.sign(
        { id: user._id },
        secret,
        { expiresIn: 900 }
    );

    return res.status(200).json({
        auth: true,
        code: 200,
        message: 'Authenticated',
        token
    });
});

module.exports = login;
