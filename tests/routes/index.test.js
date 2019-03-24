const request = require('supertest');
const app = require('../../app');

test('Shoud return 200 when ping the base url', async () => {
    await request(app)
    .get('/repeat-please')
    .expect(200)
});

test('Shoud return 400 when the URL is not right', async () => {
    await request(app)
    .get('/repeatplease')
    .expect(404)
});
