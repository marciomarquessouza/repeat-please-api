const express = require('express');
const router = express.Router();
const config = require('../../config');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Repeat Please API' });
});

router.get('/env', (req, res) => {
  res.send(config.github.user);
})

module.exports = router;
