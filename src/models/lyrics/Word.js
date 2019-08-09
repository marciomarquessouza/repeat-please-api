const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
    value: {
        type: String,
        trim: true
    },
    replacedBy: {
        type: [String]
    }
}, {
    timestamps: true
});

const Word = mongoose.model('Word', WordSchema);

module.exports = {
    WordSchema,
    Word
};
