const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const authController = require('../controllers/authControllers');
const verifyToken = require('../middlewares/auth/verifyToken');
const verifyUser = require('../middlewares/auth/verifyUser');
const Response = require('../models/responses/Response');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', (req, res) => new Response(res, 'Authorization', 200).send());
router.post('/register', verifyUser, authController.register);
router.post('/login', verifyUser, authController.login);
router.post('/logout', authController.logout);
router.get('/user', verifyToken, authController.user);

module.exports = router;
