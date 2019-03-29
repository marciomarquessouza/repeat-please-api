const request = require('supertest');
const app = require('../../app');

test('Shoud return 200 when ping the base url', (done) => {
    request(app)
    .get('/repeat-please')
    .expect(200, done)
});

test('Shoud return 400 when the URL is not right', (done) => {
    request(app)
    .get('/repeatplease')
    .expect(404, done)
});
