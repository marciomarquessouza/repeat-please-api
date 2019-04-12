const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/repeat-please', require('./src/routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next({
    status: 404,
    message: 'Not Found'
  });
});

// error handler
app.use(function(err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Server error'
  });
});

module.exports = app;
