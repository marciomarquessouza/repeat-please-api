const request = require('supertest');
const app = require('../../app.js');
const User = require('../../src/models/user');
const bcrypt = require('bcryptjs');

const dummyUser = {
    name: 'dummy',
    email: 'dummy.user@email.com',
    password: 'passDummy'
};

beforeEach(async () => {
    await User.deleteMany();
});

describe('GET /repeat-please/auth', () => {
    it('Should return with 200 - ok', (done) => {
        request(app)
        .get('/repeat-please/auth')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    });
})

describe('POST /repeat-please/auth/register', () => {
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

    it('Should answer wiht 200 - ok', (done) => {
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
