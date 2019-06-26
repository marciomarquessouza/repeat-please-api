const create = require('./create');
const fetch = require('./fetch');
const update = require('./update');
const remove = require('./remove');

module.exports = {
    ...create,
    ...fetch,
    ...update,
    ...remove
};
