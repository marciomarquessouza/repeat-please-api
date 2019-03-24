const config = require('../config/config');
const mongoose = require('mongoose');

const connectionURL = config.database.url;
const databaseName = config.database.name;

mongoose.connect(`${connectionURL}/${databaseName}`, {
    useNewUrlParser: true,
    useCreateIndex: true
});
