const mongoose = require('mongoose');
const { VerseSchema } = require('./Verse');
const sectionEnum = require('../../constants/section');

const SectionSchema = new mongoose.Schema({
    verses: [VerseSchema],
    type: {
        trype: String,
        enum: [
            sectionEnum.INSTRUMENTAL,
            sectionEnum.CHORUS,
            sectionEnum.STANZA,
            sectionEnum.INTRODUCTION,
            sectionEnum.BRIDGE
        ]
    },
    position: Number
}, {
    timestamps: false
});

const Section = mongoose.model('Section', SectionSchema);

module.exports = {
    SectionSchema,
    Section
};
