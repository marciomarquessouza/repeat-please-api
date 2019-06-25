const create = require('./create');
const fetch = require('./fetch');
const update = require('./update');

module.exports = {
    ...create,
    ...fetch,
    ...update
};
