const config = require('../config/config');
const mongoose = require('mongoose');

const connectionURL = config.mongodb.url;
const databaseName = config.mongodb.database;

mongoose.connect(`${connectionURL}/${databaseName}`, {
    useNewUrlParser: true,
    useCreateIndex: true
});
