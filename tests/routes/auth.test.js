/* eslint-disable */
const request = require('supertest');
const app = require('../../app.js');
const User = require('../../src/models/user');
const bcrypt = require('bcryptjs');
const token = require('../../src/auth/token');

const dummyUser = {
    name: 'dummy',
    email: 'dummy.user@email.com',
    password: 'passDummy'
};

let authUserToken = '';

beforeEach((done) => {
    User.deleteMany();
    done();
});

describe('GET /repeat-please/auth', () => {
    it('Should answer 200 - ok', (done) => {
        request(app)
        .get('/repeat-please/auth')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/u)
        .expect(200, done);
    });
});

describe('POST /repeat-please/auth/register', () => {
    it('Should answer 201 - created', (done) => {
        request(app)
        .post('/repeat-please/auth/register')
        .send(dummyUser)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/u)
        .expect(201)
        .end((err) => {
            if (err) return (done(err));
            done();
        });
    });
});

describe('POST /repeat-please/auth/login', () => {
    beforeEach(async () => {
        const userToLogin = {
            email: dummyUser.email,
            name: dummyUser.name,
            password: await bcrypt.hash(dummyUser.password, 8)
        };

        await User.create(userToLogin, (error) => {
            if (error) throw new Error(error);

        });
    });

    it('Should answer 200 - ok', (done) => {
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
    beforeEach(async () => {
        const userToLogin = {
            email: dummyUser.email,
            name: dummyUser.name,
            password: await bcrypt.hash(dummyUser.password, 8)
        };

        await User.create(userToLogin, (error) => {
            if (error) throw new Error(error);
        });
    });
    
    it('Should return 200 - authorized', (done) => {
        User.findOne({ email: dummyUser.email }, (err, user) => {
            if (err) throw new Error(err);
            token(user._id)
            .then((userToken) => {
                request(app)
                .get('/repeat-please/auth/user')
                .set('x-access-token', userToken)
                .expect('Content-Type', /json/u)
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
            })
            .catch((tokenError) => {
                throw new Error(tokenError.message);
            });
        });
    });
});
