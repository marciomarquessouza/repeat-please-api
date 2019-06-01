const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const lyricController = require('../controllers/lyric/lyricController');
const Response = require('../models/responses/Response');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', (req, res) => new Response(res, 'Lyric', 200).send());
router.post('/', lyricController.create);

module.exports = router;
