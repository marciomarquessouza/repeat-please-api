const mongoose = require('mongoose');

module.exports.LyricLineSchema = new mongoose.Schema({
    line: {
        type: String,
        required: true,
        trim: true
    },
    start: Number,
    end: Number,
    duration: Number
});
