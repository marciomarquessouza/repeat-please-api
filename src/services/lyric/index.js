const create = require('./create');
const update = require('./update');
const fetch = require('./fetch');

module.exports = {
    ...create,
    ...fetch,
    ...update
};
