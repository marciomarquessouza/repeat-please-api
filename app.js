const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const logger = require('./src/config/logger');
const response = require('./src/middlewares/responses');
const httpErrors = require('http-errors');

app.use(require('morgan')('combined', { 'stream': logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/repeat-please', require('./src/routes/index'));

app.use(function(req, res, next) {
  const error = httpErrors(404, 'Page Not Found');
  next(error);
});

app.use(response.errorHandler);

module.exports = app;
