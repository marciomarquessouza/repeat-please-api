const request = require('supertest');
const app = require('../../app');

describe('GET repeat-please/github/repo/:user/:name', () => {
    it('Should answer 200 - ok', (done) => {
        const user = 'marciomarquessouza';
        const pass = 'repeat-please';
        request(app)
        .get(`/repeat-please/github/repo/${user}/${pass}`)
        .expect(200, done);
    });

    it("Should answer 404 - when there is a URL typo error", (done) => {
        const user = 'marciomarquessouza';
        const pass = 'repeat-please';
        request(app)
        .get(`/repeat-please/github/rep/${user}/${pass}`)
        .expect(404, done);
    });

});
