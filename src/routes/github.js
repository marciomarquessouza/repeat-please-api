const express = require('express');
const githubService = require('../services/github/githubService');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        title: 'Github Integration'
    });
});

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
