const express = require('express');
const router = express.Router();
const githubService = require('../services/github/githubService');
const ping = require('../utils/ping');


router.get('/', (req, res) => ping(req, res, 'Github Repo'));

router.get('/repos/:user/:name', (req, res) => {
    githubService.getRepo(req.params.user, req.params.name).
    then((repoResult) => {
        res.status(200).json(repoResult);
    }).
    catch((error) => {
        res.status(error.status || 500).json(error);
    });
});

module.exports = router;
