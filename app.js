const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const logger = require('./src/config/logger');
const Response = require('./src/models/responses/Response');

app.use(require('morgan')('combined', { 'stream': logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/repeat-please', require('./src/routes/index'));

app.use(function(req, res, next) {
  const response = new Response(res, 'Not found', 404);
  response.send();
});

module.exports = app;
