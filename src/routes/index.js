const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    title: 'Repeat Please API'
  });
});

module.exports = router;
