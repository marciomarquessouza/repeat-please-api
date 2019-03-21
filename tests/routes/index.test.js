const request = require('supertest');
const app = require('../../app');

test('Shoud return 200 when ping the base url', async () => {
    request(app)
    .get('/repeat-please')
    .expect(200)
});
