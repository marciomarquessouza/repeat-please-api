const bcrypt = require('bcryptjs');
const User = require('../models/user');
const checkRequiredFields = require('../utils/checkRequiredsFields');
const token = require('./token');

const register = (req, res) => {

    checkRequiredFields(
        req.body,
        [
            'name',
            'email',
            'password'
        ],
        (missingFields) => {
            if (missingFields) {
                return res.status(500).
                json({
                    auth: false,
                    message: `Fields ${missingFields.join(',')} are requireds`
                });
            }
        }
    );

    const hashPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        email: req.body.email,
        name: req.body.name,
        password: hashPassword
    }, (error, user) => {
        if (error) {
            return res.status(500).
            send(error);
        }

        token(user._id)
        .then((userToken) => {
            return res.status(201).json({
                auth: true,
                message: 'User registered',
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
};

module.exports = register;
