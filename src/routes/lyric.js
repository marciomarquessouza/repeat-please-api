const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const lyricController = require('../controllers/lyric');
const response = require('../middlewares/responses');
const verifyToken = require('../middlewares/auth/verifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(verifyToken);

router.get('/ping', response.get);
router.get('/:id', lyricController.fetch, response.fetch);
router.post('/list/:query', lyricController.fetch, response.fetch);
router.post('/', lyricController.create, response.create);
router.put('/:id', lyricController.update, response.update);


router.use(response.errorHandler);

module.exports = router;
