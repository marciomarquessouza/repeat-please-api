const express = require('express');
const router = express.Router();
const githubController = require('../controllers/github');
const response = require('../middlewares/responses');

router.get('/ping', response.get);
router.get('/repo/:user/:name', githubController.repository, response.fetch);

module.exports = router;
