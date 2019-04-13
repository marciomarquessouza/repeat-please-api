/* eslint-disable */
const request = require('supertest');
const app = require('../../app.js');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../src/db/models/users/user');

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

    beforeEach(() => {
        sinon.stub(User, 'create').yields(null, dummyUser);
    });
    
    afterEach(() => {
        sinon.reset()
    });

    it('Should answer with 201 - created', (done) => {
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

    let find;

    beforeEach(() => {
        find = sinon.stub(User, 'findOne').yields(null, dummyUser);
        sinon.stub(bcrypt, 'compareSync').returns(true);
        sinon.stub(jwt, 'sign').returns('my-token');
    });
    
    afterEach(() => {
        find.restore();
        sinon.reset()
    });

    it('Should answer wiht 200 - ok', (done) => {
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

    let find;

    beforeEach(() => {
        find = sinon.stub(User, 'findOne').yields(null, dummyUser);
        sinon.stub(jwt, 'verify').yields(null, { id: dummyUser._id });
    });
    
    afterEach(() => {
        find.restore();
        sinon.reset()
    });

    it('Should answer with 200 - ok - user found', (done) => {
        request(app)
        .get('/repeat-please/auth/user')
        .set('x-access-token', 'my-token')
        .expect(200, done)
    });
});
