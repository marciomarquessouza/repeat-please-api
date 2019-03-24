const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const checkRequiredFields = require('../utils/checkRequiredsFields');

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

        const secret = process.env.SECRET;

        const token = jwt.sign(
            { id: user._id },
            secret,
            { expiresIn: 900 }
        );

        return res.status(201).send({
            auth: true,
            message: 'User registered',
            token
        });
    });
};

module.exports = register;
