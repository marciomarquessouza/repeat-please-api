const express = require('express');
const router = express.Router();
const Response = require('../models/responses/Response');

router.get('/', (req, res) => new Response(res, 'Repeat Please', 200).send());
router.use('/auth', require('./auth'));
router.use('/github', require('./github'));
router.use('/lyric', require('./lyric'));

module.exports = router;
