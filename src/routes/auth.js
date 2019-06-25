const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const authController = require('../controllers/auth');
const verifyToken = require('../middlewares/auth/verifyToken');
const verifyUser = require('../middlewares/auth/verifyUser');
const response = require('../middlewares/responses');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/ping', verifyToken, response.get);
router.post('/register', verifyUser, authController.register, response.create);
router.post('/login', verifyUser, authController.login, response.fetch);
router.post('/logout', response.get);
router.get('/user', verifyToken, authController.user, response.fetch);

router.use(response.errorHandler);

module.exports = router;
