const express = require('express');
const router = express.Router();
const githubController = require('../controllers/githubControllers');
const ping = require('../utils/ping');


router.get('/', (req, res) => ping(req, res, 'Github Repo'));

router.get('/repo/:user/:name', githubController.repository);

module.exports = router;
