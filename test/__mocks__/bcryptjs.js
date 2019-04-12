module.exports = {
    compareSync: (password, compare) => true,
    hash: (password, salt, callback) => {
        return callback(null, 'secret');
    }
};

