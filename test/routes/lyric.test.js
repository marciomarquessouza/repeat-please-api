const request = require('supertest');
const app = require('../../app.js');
const sinon = require('sinon');
const AppError = require('../../src/exceptions/AppException');
const AuthError = require('../../src/exceptions/AuthException');
const auth = require('../../src/auth/auth');
const token = require('../../src/auth/token');
const lyric = require('../../src/controllers/auth');
const token = require('../../src/auth/token');

const dummyUser = {
    _id: 'dummy_id',
    name: 'dummy',
    email: 'dummy.user@email.com',
    password: 'secret'
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

// describe('POST /repeat-please/lyric/', () => {
    
//     let lyric, verify;

//     beforeEach(() => {
//         lyric = sinon.stub(lyric, 'create');
//         verify = sinon.stub(token, 'verify');
//     });

//     afterEach(() => {
//         lyric.restore();
//         verify.restore();
//     })

//     it('Should answer with 201 - created', (done) => {
        
//     });
// });