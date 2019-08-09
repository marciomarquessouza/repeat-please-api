const mongoose = require('mongoose');
const { WordSchema } = require('./Word');

const VerseSchema = new mongoose.Schema({
    words: [WordSchema],
    position: {
        type: Number,
        required: true
    },
    start: Number,
    end: Number,
    duration: Number
}, {
    timestamps: true
});

const Verse = mongoose.model('Verse', VerseSchema);

module.exports = {
    VerseSchema,
    Verse
};
