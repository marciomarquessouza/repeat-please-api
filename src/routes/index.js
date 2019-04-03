const express = require('express');
const router = express.Router();
const ping = require('../utils/ping');

router.get('/', (req, res) => ping(req, res, 'Repeat Please API'));
router.use('/auth', require('./auth'));
router.use('/github', require('./github'));

module.exports = router;
