const create = require('./create');
const update = require('./update');
const fetch = require('./fetch');
const remove = require('./remove');

module.exports = {
    ...create,
    ...fetch,
    ...update,
    ...remove
};
