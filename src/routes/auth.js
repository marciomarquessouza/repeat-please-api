const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const register = require('../actions/auth/register');
const login = require('../actions/auth/login');
const logout = require('../actions/auth/logout');
const verifyToken = require('../actions/auth/verifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        title: 'Authorization'
    });
});

router.post('/register', (req, res) => register(req, res));

router.post('/login', (req, res) => login(req, res));

router.post('/logout', (req, res) => logout(req, res));

router.get('/user', verifyToken, (req, res) => {
    res.status(200).json({
        status: 200,
        userId: req.userId
    });
});

module.exports = router;
