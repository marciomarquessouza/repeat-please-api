const config = require('../config/config');
const mongoose = require('mongoose');

const connectionURL = config.database.url;

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
});
