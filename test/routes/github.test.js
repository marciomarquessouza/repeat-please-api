const supertest = require('supertest');
const app = require('../../app');
const sinon = require('sinon');
const request = require('request');
const githubResponse = require('../__mocks__/githubResponse.json');

describe('GET repeat-please/github/repo/:user/:name', () => {


    it('Should answer 200 - ok', (done) => {
        const requestGet = sinon.stub(request, 'get').yields(null, { statusCode: 200 }, JSON.stringify(githubResponse));
    
        const user = 'marciomarquessouza';
        const pass = 'repeat-please';
        supertest(app)
        .get(`/repeat-please/github/repo/${user}/${pass}`)
        .expect(200)
        .end(() => {
            requestGet.restore();
            done();
        });
    });

    it("Should answer 404 - when there is a URL typo error", (done) => {
        const githubError = new Error('Not found');
        githubError.code = '404';
        const requestGet = sinon.stub(request, 'get').yields(githubError, { statusCode: 404 }, JSON.stringify({ message: 'Nout found' }));

        const user = 'marciomarquessouza';
        const pass = 'repeat-please';
        supertest(app)
        .get(`/repeat-please/github/rep/${user}/${pass}`)
        .expect(404)
        .end((error) => {
            requestGet.restore();
            if (error) done(error);
            done();
        });
    });

});
