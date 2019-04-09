const request = require('supertest');
const app = require('../../app.js');
const User = require('../../src/models/users/user');
const bcrypt = require('bcryptjs');

const dummyUser = {
    name: 'dummy',
    email: 'dummy.user@email.com',
    password: 'passDummy'
};

beforeEach(async (done) => {
    await User.deleteMany();
    done();
});

describe('GET /repeat-please/auth', () => {
    it('Should return with 200 - ok', async (done) => {
        request(app)
        .get('/repeat-please/auth')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    });
})

describe('POST /repeat-please/auth/register', () => {
    it('Should answer with 201 - created', async (done) => {
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
    beforeEach(async () => {
        const userToLogin = {
            email: dummyUser.email,
            name: dummyUser.name,
            password: await bcrypt.hash(dummyUser.password, 8)
        };

        await User.create(userToLogin, (error, user) => {
            if (error) return console.log('Error: ' + error);
        });
    });

    it('Should answer wiht 200 - ok', async (done) => {
        request(app)
        .post('/repeat-please/auth/login')
        .send({
            email: dummyUser.email,
            password: dummyUser.password
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });  
});

describe('GET /repeat-please/auth/user', ()=> {
    beforeEach(async () => {
        const userToFound = {
            _id: '746573742d69642d75736572',
            email: dummyUser.email,
            name: dummyUser.name,
            password: await bcrypt.hash(dummyUser.password, 8)
        };

        await User.create(userToFound, (error, user) => {
            if (error) return console.log('Error: ' + error);
        });
    });

    it('Should answer with 200 - ok - user found', (done) => {
        request(app)
        .get('/repeat-please/auth/user')
        .set('x-access-token', 'my-token')
        .expect(200, done)
    });
})