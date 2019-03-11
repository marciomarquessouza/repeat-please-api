const express = require('express');
const github = require('../services/githubService');
const router = express.Router();

router.get('/', (req, res) => {
    github('marciomarquessouza', 'repeat-please').then((githubResult) => {
        res.status(200).send(githubResult);
    }).
    catch((error) => {
        res.status(500).send(error);
    });
});

module.exports = router;
