const { createLogger, format, transports } = require('winston');
const fs = require('fs');
require('winston-daily-rotate-file');
const { lv } = require('../constants/log');

const logDir = () => {
  const logDirPath = 'logs';
  if (!fs.existsSync(logDirPath)) {
    fs.mkdirSync(logDirPath);
  }
  return `${logDirPath}/%DATE%-repeat-please.log`;
};

const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: logDir(),
    datePattern: 'YYYY-MM-DD'
});

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.colorize(),
    format.simple()
  ),
  transports: [dailyRotateFileTransport]
});

logger.stream.write = function(message) {
    logger.info(message);
};

logger.build = function (level, err) {
  this.message = err.message;
  Error.captureStackTrace(this, err);
  logger[level](this.stack);
};

logger.lv = lv;

module.exports = logger;
