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

const Lyric = mongoose.model('Lyric', LyricSchema);

module.exports = {
    LyricSchema,
    Lyric
};
