const assert = require('assert');
const { Lyric } = require('../../models/lyrics/Lyric');

module.exports.create = (body) => {
    return new Promise((resolve, reject) => {
        const { title } = body;
        assert.ok(title, 'Title is required');
        const lyric = new Lyric();
        lyric.createLyric(body)
        .then((response) => {
            return resolve(response);
        })
        .catch((err) => {
            return reject(err);
        });
    });
};
