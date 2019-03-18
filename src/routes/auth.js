const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const User = require('../models/user');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.status(200).send('auth working');
});

router.post('/register', (req, res) => {
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

        const token = jwt.sign(
            { id: user._id },
            config.secret,
            { expiresIn: 900 }
        );

        return res.status(200).send({
            auth: true,
            token
        });
    });
});

module.exports = router;
