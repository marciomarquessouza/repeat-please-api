/* eslint-disable */
const request = require('supertest');
const app = require('../../app.js');
const sinon = require('sinon');
const User = require('../../src/models/users/User');
const token = require('../../src/auth/token');

const dummyUser = {
    _id: 'dummy_id',
    name: 'dummy',
    email: 'dummy.user@email.com',
    password: 'secret'
};

describe('GET /repeat-please/auth', () => {
    it('Should return with 200 - ok', (done) => {
        request(app)
        .get('/repeat-please/auth')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/u)
        .expect(200, done);
    });
});

describe('POST /repeat-please/auth/register', () => {

    let createUser, hash, createToken;

    beforeEach(() => {
        createUser = sinon.stub(User, 'create');
        hash = sinon.stub(token, 'hash');
        createToken = sinon.stub(token, 'create');
    });

    afterEach(() => {
        createUser.restore();
        hash.restore();
        createToken.restore();
    });

    it('Should answer with 201 - created', (done) => {
        createUser.yields(null, dummyUser);
        hash.returns(Promise.resolve('secret'));
        createToken.returns(Promise.resolve('my-token'));

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
});

describe('POST /repeat-please/auth/login', () => {

    let find, checkPass, create;

    beforeEach(() => {
        find = sinon.stub(User, 'findOne');
        checkPass = sinon.stub(token, 'checkPass');
        create = sinon.stub(token, 'create');
    });

    afterEach(() => {
        find.restore();
        checkPass.restore();
        create.restore();
    });

    it('Should answer wiht 200 - ok', (done) => {

        find.yields(null, dummyUser);
        checkPass.returns(Promise.resolve(true));
        create.returns(Promise.resolve('my-token'));

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

    let find, verify;

    beforeEach(() => {
        find = sinon.stub(User, 'findOne');
        verify = sinon.stub(token, 'verify');
    });

    afterEach(() => {
        find.restore();
        verify.restore();
    })

    it('Should answer with 200 - ok - user found', (done) => {

        find.yields(null, dummyUser);
        verify.yields(null, { id: 'my_id' });

        request(app)
        .get('/repeat-please/auth/user')
        .set('x-access-token', 'my-token')
        .expect(200, done)
    });
});
