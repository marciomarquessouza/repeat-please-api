const { expect } = require('chai');
const sinon = require('sinon');
const User = require('../../../src/models/users/User');
const authService = require('../../../src/services/auth');
const token = require('../../../src/services/auth/token');
const AuthError = require('../../../src/exceptions/AuthException');

describe('auth/register.js', () => {
    let createUser, hash, createToken;
    const dummyUser = {
        _id: 'dummy_id',
        name: 'dummy',
        email: 'dummy.user@email.com',
        password: 'secret'
    };

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

    it('Should register a new user', (done) => {
        createUser.yields(null, dummyUser);
        hash.returns(Promise.resolve('secret'));
        createToken.returns(Promise.resolve('my-token'));

        authService.register(dummyUser.email, dummyUser.name, dummyUser.password)
        .then(({token, user}) => {
            expect(token).to.equal('my-token');
            expect(user).to.deep.equal(dummyUser);
            done();
        });
    });

    it('Should return a Token-hash error', async () => {
        createUser.yields(null, dummyUser);
        hash.returns(Promise.reject(new AuthError('Token error - hash', 500)));
        createToken.returns(Promise.resolve('my-token'));

        await authService.register(dummyUser.name, dummyUser.name, dummyUser.password)
        .then(() => {
            throw new Error('Erro was not generated');
        })
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('Token error - hash');
            expect(error.code).to.equal(500);
        });
    });

    it('Should return a Database error', async () => {

        createUser.yields(new Error('Database error'));
        hash.returns(Promise.resolve('secret'));
        createToken.returns(Promise.resolve('my-token'));

        await authService.register(dummyUser.name, dummyUser.name, dummyUser.password)
        .then(() => {
            throw new Error('Erro was not generated');
        })
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('Database error');
            expect(error.code).to.equal(500);
        });
    });

    it('Should return a Token-jwt error', async () => {
        createUser.yields(null, dummyUser);
        hash.returns(Promise.resolve('secret'));
        createToken.returns(Promise.reject(new AuthError('Token creation error', 500)));

        await authService.register(dummyUser.name, dummyUser.name, dummyUser.password)
        .then(() => {
            throw new Error('Erro was not generated');
        })
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('Token creation error');
            expect(error.code).to.equal(500);
        });
    });
});