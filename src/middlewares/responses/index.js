const responseHandler = require('./responseHandler');
const errorHandler = require('./errorHandler');

module.exports = {
    ...errorHandler,
    ...responseHandler
};
