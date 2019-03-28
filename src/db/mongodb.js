const config = require('../config/config');
const mongoURL = require('./mongoURL');
const mongoose = require('mongoose');

const connectionURL =
mongoURL(
    config.database.name,
    config.database.user,
    config.database.pass
    );

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
});
