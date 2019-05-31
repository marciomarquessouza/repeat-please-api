const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    duration: Date,
    file: String
});

const Track = mongoose.model('Track', TrackSchema);

module.exports = {
    TrackSchema,
    Track
};
