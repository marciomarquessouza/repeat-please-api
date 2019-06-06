const express = require('express');
const router = express.Router();
const githubController = require('../controllers/github');
const Response = require('../models/responses/Response');

router.get('/', (req, res) => new Response(res, 'Github Repo', 200).send());
router.get('/repo/:user/:name', githubController.repository);

module.exports = router;
