const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    title: 'Repeat Please API'
  });
});

router.use('/auth', require('./auth'));
router.use('/github', require('./github'));

module.exports = router;
