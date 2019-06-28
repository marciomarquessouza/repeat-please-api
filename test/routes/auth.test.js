const request = require('supertest');
const app = require('../../app.js');
const sinon = require('sinon');
const httpError = require('http-errors');
const auth = require('../../src/services/auth');
const token = require('../../src/services/auth/token')

const dummyUser = {
    _id: 'dummy_id',
    name: 'dummy',
    email: 'dummy.user@email.com',
    password: 'secret'
};

describe('GET /repeat-please/auth', () => {

    let verify;

    beforeEach(() => {
        verify = sinon.stub(token, 'verify');
    });

    afterEach(() => {
        verify.restore();
    })
    it('Should return with 200 - ok', (done) => {
        verify.yields(null, { id: 'my_id' });

        request(app)
        .get('/repeat-please/auth/ping')
        .set('Accept', 'application/json')
        .set('x-access-token', 'my-token')
        .expect('Content-Type', /json/u)
        .expect(200, done);
    });
});

describe('POST /repeat-please/auth/register', () => {

    let register;

    beforeEach(() => {
        register = sinon.stub(auth, 'register');
    });

    afterEach(() => {
        register.restore();
    });

    it('Should answer with 201 - created', (done) => {

        register.resolves('my-token');

        request(app)
        .post('/repeat-please/auth/register')
        .send(dummyUser)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err) => {
            if (err) return(done(err));
            done();
        });
    });

    it('Should answer 401 - unauthorized', (done) => {
        register.rejects(httpError(401, 'Unauthorized'));

        request(app)
        .post('/repeat-please/auth/register')
        .send(dummyUser)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err) => {
            if (err) return(done(err));
            done();
        });
    });

    it('Should answer with 500 - Internal Server Error', (done) => {
        register.rejects(httpError(500, 'Internal Server Error'));

        request(app)
        .post('/repeat-please/auth/register')
        .send(dummyUser)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .end((err) => {
            if (err) return(done(err));
            done();
        });
    });

    it('Should answer with Default 500', (done) => {
        register.rejects(new Error('Internal Server Error'));

        request(app)
        .post('/repeat-please/auth/register')
        .send(dummyUser)    
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .end((err) => {
            if (err) return(done(err));
            done();
        });
    });
});

describe('POST /repeat-please/auth/login', () => {

    let login;

    beforeEach(() => {
        login = sinon.stub(auth, 'login');
    });

    afterEach(() => {
        login.restore();
    });

    it('Should answer wiht 200 - ok', (done) => {

        login.resolves('my-token');

        request(app)
        .post('/repeat-please/auth/login')
        .send({
            email: dummyUser.email,
            password: dummyUser.password
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/u)
        .expect(200)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });

    it('Should answer wiht 400 when the user mail was not sent', (done) => {

        request(app)
        .post('/repeat-please/auth/login')
        .send({
            email: null,
            password: dummyUser.password
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/u)
        .expect(400, done);
    });

    it('Should answer wiht 400 when the user pass was not sent', (done) => {

        request(app)
        .post('/repeat-please/auth/login')
        .send({
            email: dummyUser.email,
            password: null
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/u)
        .expect(400, done);
    });

    it('Should answer wiht 401 - Unauthorized', (done) => {

        login.rejects(httpError(401, 'Unauthorized'));

        request(app)
        .post('/repeat-please/auth/login')
        .send({
            email: dummyUser.email,
            password: dummyUser.password
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/u)
        .expect(401)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });

    it('Should answer wiht 404 - Not Found', (done) => {

        login.rejects(httpError(404, 'Not Found'));

        request(app)
        .post('/repeat-please/auth/login')
        .send({
            email: dummyUser.email,
            password: dummyUser.password
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/u)
        .expect(404)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });

    it('Should answer wiht 500 - Internal Server Error', (done) => {

        login.rejects(httpError(500, 'Internal Server Error'));

        request(app)
        .post('/repeat-please/auth/login')
        .send({
            email: dummyUser.email,
            password: dummyUser.password
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/u)
        .expect(500)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });

    it('Should answer wiht Default 500', (done) => {

        login.rejects(new Error('Internal Server Error'));

        request(app)
        .post('/repeat-please/auth/login')
        .send({
            email: dummyUser.email,
            password: dummyUser.password
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/u)
        .expect(500)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });
});

describe('POST /repeat-please/auth/logout', () => {
    it('Should answer 200 - ok', (done) => {
        request(app)
        .post('/repeat-please/auth/logout')
        .expect('Content-Type', /json/u)
        .expect(200)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });
});

describe('GET /repeat-please/auth/user', () => {

    let user, verify;

    beforeEach(() => {
        user = sinon.stub(auth, 'user');
        verify = sinon.stub(token, 'verify');
    });

    afterEach(() => {
        user.restore();
        verify.restore();
    })

    it('Should answer with 200 - ok - user found', (done) => {

        user.resolves(dummyUser);
        verify.yields(null, { id: 'my_id' });

        request(app)
        .get('/repeat-please/auth/user')
        .set('x-access-token', 'my-token')
        .expect(200, done)
    });

    it('Should answer with 401 when the tokens was not sent', (done) => {
        request(app)
        .get('/repeat-please/auth/user')
        .expect(401, done)
    });

    it('Should answer with 401 - tokes was not validated', (done) => {
        verify.yields(httpError(401, 'token was not validated'));

        request(app)
        .get('/repeat-please/auth/user')
        .set('x-access-token', 'my-token')
        .expect(401, done)
    });

    it('Should answer with 404 - user not found', (done) => {

        user.rejects(httpError(404, 'Not Found'));
        verify.yields(null, { id: 'my_id' });

        request(app)
        .get('/repeat-please/auth/user')
        .set('x-access-token', 'my-token')
        .expect(404)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });

    it('Should answer with default 500', (done) => {

        user.rejects(new Error('Internal Server Error'));
        verify.yields(null, { id: 'my_id' });

        request(app)
        .get('/repeat-please/auth/user')
        .set('x-access-token', 'my-token')
        .expect(500)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });
});
