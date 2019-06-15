const status = require('http').STATUS_CODES;
const http = require('http');

const check = (code, def) => {
    return status[code] ? code : def;
};

module.exports = {
    check,
    ...http
};
