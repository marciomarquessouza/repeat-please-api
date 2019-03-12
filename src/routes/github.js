const express = require('express');
const github = require('../services/github/githubService');
const router = express.Router();

router.get('/', (req, res) => {
    github('marciomarquessouza', 'nada').then((githubResult) => {
        res.status(200).send(githubResult);
    }).
    catch((error) => {
        res.status(error.status || 500).send(error.message);
    });
});

module.exports = router;
