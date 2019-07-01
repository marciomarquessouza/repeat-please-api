const { SectionSchema } = require('./Section');
const mongoose = require('mongoose');

const LyricSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    sections: [SectionSchema]
}, {
    timestamps: true
});

const Lyric = mongoose.model('Lyric', LyricSchema);

module.exports = {
    LyricSchema,
    Lyric
};
