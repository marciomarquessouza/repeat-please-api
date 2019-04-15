const request = require('supertest');
const app = require('../../app');

describe('GET repeat-please', () => {
    it('Shoud return 200 when ping the base url', (done) => {
        request(app)
        .get('/repeat-please')
        .expect(200, done);
    });

    it('Shoud return 404 when the URL is not right', (done) => {
        request(app)
        .get('/repeatplease')
        .expect(404, done);
    });
});
