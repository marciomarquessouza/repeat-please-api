const DBError = require('../../exceptions/DatabaseException');
const logger = require('../../config/logger');
const { LyricLineSchema } = require('./LyricLine');
const mongoose = require('mongoose');

const LyricSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    lines: [LyricLineSchema]
}, {
    timestamps: true
});

LyricSchema.methods.createLyric = function createLyric(body) {
    return new Promise((resolve, reject) => {
        this.model('Lyric').create({
            ...body
        }, (error, lyric) => {
            if (error) {
                return reject(new DBError(error.message, 500, 'error'));
            }
            logger.info(`Lyric "${lyric.title}" created`);
            return resolve(lyric);
        });
    });
};

const Lyric = mongoose.model('Lyric', LyricSchema);

module.exports = {
    LyricSchema,
    Lyric
};
