const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const authController = require('../controllers/authControllers');
const verifyToken = require('../middlewares/verifyToken');
const Response = require('../domain/responses/Response');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', (req, res) => new Response(res, 'Authorization', 200).send());
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/user', verifyToken, authController.user);

module.exports = router;
