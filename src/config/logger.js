const { createLogger, format, transports } = require('winston');
const fs = require('fs');
require('winston-daily-rotate-file');

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

module.exports = logger;
