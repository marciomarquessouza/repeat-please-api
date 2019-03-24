const request = require('supertest');
const app = require('../../app');
const User = require('../../src/models/user');

const userToRegister = {
    name: 'dummy1',
    email: 'dummy1.user@email.com',
    password: 'passDummy1'
};

const userToLogin = {
    name: 'dummy2',
    email: 'dummy2.user@email.com',
    password: 'passDummy2'
};

beforeEach(async () => {
    await User.deleteMany();
    await User.create(userToLogin, (error, user) => {
        if (error) return console.log('Error: ' + error);
    });
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
        .send(userToRegister)
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
    it('Should answer wiht 200 - ok', (done) => {
        request(app)
        .post('/repeat-please/auth/login')
        .send({
            email: 'dummy2.user@email.com',
            password: 'passDummy2'
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
