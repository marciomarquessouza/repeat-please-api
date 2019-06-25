const express = require('express');
const router = express.Router();
const response = require('../middlewares/responses');

router.get('/', response.get);
router.use('/auth', require('./auth'));
router.use('/github', require('./github'));
router.use('/lyric', require('./lyric'));

module.exports = router;
