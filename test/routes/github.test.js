const supertest = require('supertest');
const app = require('../../app');
const sinon = require('sinon');
const request = require('request');
const githubResponse = require('../helper/githubResponse.json');

describe('GET /repeat-please/github', () => {
    it('Should answer 200 - ok', (done) => {
        supertest(app)
        .get('/repeat-please/github/ping')
        .expect(200)
        .end((error) => {
            if (error) done(error);
            done();
        });
    });
});

describe('GET /repeat-please/github/repo/:user/:name', () => {

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

    it('Should answer 500 - Internal server error', (done) => {
        const requestGet = sinon.stub(request, 'get').yields(null, { statusCode: 200 }, githubResponse);
    
        const user = 'marciomarquessouza';
        const pass = 'repeat-please';
        supertest(app)
        .get(`/repeat-please/github/repo/${user}/${pass}`)
        .expect(500)
        .end(() => {
            requestGet.restore();
            done();
        });
    });

    it("Should answer 404 - URL with a typo error", (done) => {
        const user = 'marciomarquessouza';
        const pass = 'repeat-please';
        supertest(app)
        .get(`/repeat-please/github/rep/${user}/${pass}`)
        .expect(404)
        .end((error) => {
            if (error) return done(error);
            done();
        });
    });

    it("Should answer repository does not exist", (done) => {
        const githubError = new Error('Not found');
        const requestGet = sinon.stub(request, 'get').yields(githubError, { statusCode: 502 }, JSON.stringify({ message: 'Not found' }));

        const user = 'marciomarquessouza';
        const pass = 'repeat-please';
        supertest(app)
        .get(`/repeat-please/github/repo/${user}/${pass}`)
        .expect(502)
        .end((error) => {
            requestGet.restore();
            if (error) return done(error);
            done();
        });
    });

    it("Should answer forbidden", (done) => {
        const githubError = new Error('Forbidden');
        const requestGet = sinon.stub(request, 'get').yields(githubError, { statusCode: 502 }, JSON.stringify({ message: 'forbidden' }));

        const user = 'marciomarquessouza';
        const pass = 'repeat-please';
        supertest(app)
        .get(`/repeat-please/github/repo/${user}/${pass}`)
        .expect(502)
        .end((error) => {
            requestGet.restore();
            if (error) return done(error);
            done();
        });
    });

    it("Should answer unauthorized", (done) => {
        const githubError = new Error('unauthorized');
        const requestGet = sinon.stub(request, 'get').yields(githubError, { statusCode: 502 }, JSON.stringify({ message: 'unauthorized' }));

        const user = 'marciomarquessouza';
        const pass = 'repeat-please';
        supertest(app)
        .get(`/repeat-please/github/repo/${user}/${pass}`)
        .expect(502)
        .end((error) => {
            requestGet.restore();
            if (error) return done(error);
            done();
        });
    });

    it("Should answer Internal Server Error", (done) => {
        const githubError = new Error('Internal Server Error');
        const requestGet = sinon.stub(request, 'get').yields(githubError, { statusCode: 502 }, JSON.stringify({ message: 'Internal Server Error' }));

        const user = 'marciomarquessouza';
        const pass = 'repeat-please';
        supertest(app)
        .get(`/repeat-please/github/repo/${user}/${pass}`)
        .expect(502)
        .end((error) => {
            requestGet.restore();
            if (error) return done(error);
            done();
        });
    });

    it("Should answer 502 - Bad Gateway ", (done) => {
        const githubError = new Error('Bad Gateway ');
        const requestGet = sinon.stub(request, 'get').yields(githubError, { statusCode: 502 }, JSON.stringify({ message: 'Internal Server Error' }));

        const user = 'marciomarquessouza';
        const pass = 'repeat-please';
        supertest(app)
        .get(`/repeat-please/github/repo/${user}/${pass}`)
        .expect(502)
        .end((error) => {
            requestGet.restore();
            if (error) return done(error);
            done();
        });
    });

    it("Should answer 502 - Internal Server Error (default) ", (done) => {
        const githubError = new Error('Internal Server Error');
        const requestGet = sinon.stub(request, 'get').yields(githubError);

        const user = 'marciomarquessouza';
        const pass = 'repeat-please';
        supertest(app)
        .get(`/repeat-please/github/repo/${user}/${pass}`)
        .expect(502)
        .end((error) => {
            requestGet.restore();
            if (error) return done(error);
            done();
        });
    });
});
