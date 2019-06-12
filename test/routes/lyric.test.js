const request = require('supertest');
const app = require('../../app.js');
const sinon = require('sinon');
const token = require('../../src/auth/token');
const lyricService = require('../../src/services/lyric');

const dummyUser = {
    _id: 'dummy_id',
    name: 'dummy',
    email: 'dummy.user@email.com',
    password: 'secret'
};

const dummyLyric = {
    title: 'Dummy Title',
    lines: [
        {
            title: 'dummy line 1',
            start: 10,
            end: 20,
            duration: 10
        }
    ]
};

describe('GET /repeat-please/lyric/ping', () => {
    it('Should return with 200 - ok', (done) => {
        request(app)
        .get('/repeat-please/lyric/ping')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/u)
        .expect(200, done);
    });
});

describe('POST /repeat-please/lyric/', () => {
    
    let createLyric, verify;

    beforeEach(() => {
        createLyric = sinon.stub(lyricService, 'create');
        verify = sinon.stub(token, 'verify');
    });

    afterEach(() => {
        createLyric.restore();
        verify.restore();
    })

    it('Should answer with 201 - created', (done) => {
        createLyric.resolves(dummyLyric);
        verify.yields(null, { id: 'my_id' });

        request(app)
        .post('/repeat-please/lyric')
        .send({
            title: dummyLyric.title
        })
        .set('Accept', 'application/json')
        .set('x-access-token', 'my-token')
        .expect('Content-Type', /json/u)
        .expect(201)
        .end((err) => {
            if (err) return(done(err));
            done();
        });
    });

    it('Should answer with 405 - Method Not Allowed', (done) => {
        createLyric.rejects('Title is required');
        verify.yields(null, { id: 'my_id' });

        request(app)
        .post('/repeat-please/lyric')
        .send({
            title: null
        })
        .set('Accept', 'application/json')
        .set('x-access-token', 'my-token')
        .expect('Content-Type', /json/u)
        .expect(405)
        .end((err) => {
            if (err) return(done(err));
            done();
        });
    });
});