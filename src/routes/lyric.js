const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const lyricController = require('../controllers/lyric');
const Response = require('../models/responses/Response');
const verifyToken = require('../middlewares/auth/verifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/ping', (req, res) => new Response(res, 'Lyric', 200).send());
router.get('/:id', verifyToken, lyricController.fetch);
router.post('/list/:query', verifyToken, lyricController.fetch);
router.post('/', verifyToken, lyricController.create);
router.put('/:id', verifyToken, lyricController.update);

module.exports = router;
