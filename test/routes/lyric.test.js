const request = require('supertest');
const app = require('../../app.js');
const sinon = require('sinon');
const token = require('../../src/auth/token');
const lyricService = require('../../src/services/lyric');
const AppError = require('../../src/exceptions/AppException');

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

const dummyLyric2 = {
    title: 'Dummy Title2',
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

describe("GET /repeat-please/lyric/:id", () => {

    let fetchByID, verify;

    beforeEach(() => {
        verify = sinon.stub(token, 'verify');
        fetchByID = sinon.stub(lyricService, 'fetchByID')
    });

    afterEach(() => {
        fetchByID.restore();
        verify.restore();
    });

    it('Should answer 200 and return a Lyric Object by ID', (done) => {

        verify.yields(null, { id: 'my_id'});
        fetchByID.resolves(dummyLyric);

        request(app)
        .get('/repeat-please/lyric/5cf2c9ae5586fd2f0a58ba33')
        .set('Accept', 'application/json')
        .set('x-access-token', 'my-token')
        .expect(200)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });

    it("Should answer 404 when the lyric doesn't exist", (done) => {
        verify.yields(null, { id: 'my_id'});
        fetchByID.rejects(new AppError('Lyric not Found', 404, 'error'));

        request(app)
        .get('/repeat-please/lyric/5cf2c9ae5586fd2f0a58ba30')
        .set('Accept', 'application/json')
        .set('x-access-token', 'my-token')
        .expect(404)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });

    it("Should answer 502 when the lyric id's invalid", (done) => {
        verify.yields(null, { id: 'my_id'});
        fetchByID.rejects(new AppError('Internal Error', 502, 'error'));

        request(app)
        .get('/repeat-please/lyric/5cf2c9ae')
        .set('Accept', 'application/json')
        .set('x-access-token', 'my-token')
        .expect(502)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });
});

describe("POST /repeat-please/lyric/list/:query", () => {

    let fetch, verify;

    beforeEach(() => {
        verify = sinon.stub(token, 'verify');
        fetch = sinon.stub(lyricService, 'fetch')
    });

    afterEach(() => {
        fetch.restore();
        verify.restore();
    });

    it('Should answer 200 and return a lyric list', (done) => {

        verify.yields(null, { id: 'my_id'});
        fetch.resolves([dummyLyric, dummyLyric2]);

        request(app)
        .post('/repeat-please/lyric/list/query?limit=10&skip=0')
        .set('Accept', 'application/json')
        .set('x-access-token', 'my-token')
        .expect(200)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });

    it('Should answer 200 when the parms limit and skip are null', (done) => {

        verify.yields(null, { id: 'my_id'});
        fetch.resolves([dummyLyric, dummyLyric2]);

        request(app)
        .post('/repeat-please/lyric/list/query')
        .set('Accept', 'application/json')
        .set('x-access-token', 'my-token')
        .expect(200)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });

    it('Should answer 200 when the body has a valid body query', (done) => {

        verify.yields(null, { id: 'my_id'});
        fetch.resolves([dummyLyric]);

        request(app)
        .post('/repeat-please/lyric/list/query')
        .set('Accept', 'application/json')
        .set('x-access-token', 'my-token')
        .send({ title: dummyLyric.title })
        .expect(200)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });

    it('Should answer 404 when any lyric was not found', (done) => {

        verify.yields(null, { id: 'my_id'});
        fetch.rejects(new AppError('No Results', 404, 'error'));

        request(app)
        .post('/repeat-please/lyric/list/query')
        .set('Accept', 'application/json')
        .set('x-access-token', 'my-token')
        .send({ title: 'dummy title false' })
        .expect(404)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });

    it('Should answer a genereic server error', (done) => {

        verify.yields(null, { id: 'my_id'});
        fetch.rejects(new Error(''));

        request(app)
        .post('/repeat-please/lyric/list/query')
        .set('Accept', 'application/json')
        .set('x-access-token', 'my-token')
        .send({ title: 'dummy title false' })
        .expect(500)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });

});

describe("PUT /repeat-please/lyric/:_id", () => {

    let update, verify;

    beforeEach(() => {
        verify = sinon.stub(token, 'verify');
        update = sinon.stub(lyricService, 'update')
    });

    afterEach(() => {
        update.restore();
        verify.restore();
    });

    it('Should answer 200', (done) => {
        dummyLyric.title = "new title";
        verify.yields(null, { id: 'my_id'});
        update.resolves(dummyLyric);

        request(app)
        .put('/repeat-please/lyric/5d053e6f93022722806f51ef')
        .set('Accept', 'application/json')
        .set('x-access-token', 'my-token')
        .send(dummyLyric)
        .expect(200)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });

    it("Should answer 400 (Bad Request) when the body wasn't sent", (done) => {

        dummyLyric.title = "new title";
        verify.yields(null, { id: 'my_id'});
        update.rejects(new AppError('New Lyric is required', 400, 'error'));

        request(app)
        .put('/repeat-please/lyric/5d053e6f93022722806f51ef')
        .set('Accept', 'application/json')
        .set('x-access-token', 'my-token')
        .expect(400)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });

    it('Should answer 404 when any lyric was not found', (done) => {

        dummyLyric.title = "new title";
        verify.yields(null, { id: 'my_id'});
        update.rejects(new AppError('No Results', 404, 'error'));

        request(app)
        .put('/repeat-please/lyric/5d053e6f93022722806f5cure')
        .set('Accept', 'application/json')
        .set('x-access-token', 'my-token')
        .send(dummyLyric)
        .expect(404)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });

    it('Should answer a genereic server error', (done) => {

        dummyLyric.title = "new title";
        verify.yields(null, { id: 'my_id'});
        update.rejects(new Error(''));

        request(app)
        .put('/repeat-please/lyric/5d053e6f93022722806f5cure')
        .set('Accept', 'application/json')
        .set('x-access-token', 'my-token')
        .send(dummyLyric)
        .expect(500)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });
});