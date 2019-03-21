const mongoose = require('mongoose');

const connectionURL = process.env.DATABASE_URL;
const databaseName = process.env.DATABASE;

mongoose.connect(`${connectionURL}/${databaseName}`, {
    useNewUrlParser: true,
    useCreateIndex: true
});
