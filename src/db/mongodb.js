const config = require('../config/config');
const mongoURL = require('./mongoURL');
const mongoose = require('mongoose');

const connectionURL =
mongoURL(
    config.database.rawURL,
    config.database.name,
    config.database.user,
    config.database.pass
    );

const connection = (url, server, repeatLocal = false) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true
        }, (error) => {
            if (error && repeatLocal) {
                const mongoLocalURL = mongoURL(
                    config.database.localURL,
                    config.database.name
                    );

                connection(mongoLocalURL, 'LOCAL SERVER [Repeat Local is ON]')
                .then((message) => resolve(message))
                .catch((localError) => reject(localError));
            } else if (error) {
                reject(error);
            } else {
                resolve(`Connected to ${server}`);
            }
        });
    });
};

module.exports = connection(
    connectionURL,
    config.database.server,
    config.database.repeatLocal
    );
