const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const User = require('../../src/db/models/users/user');
const jwt = require('jsonwebtoken');
const register = require('../../src/auth/register');

describe('auth/register.js', () => {
    let create, hash, sign;
    const dummyUser = {
        _id: 'dummy_id',
        name: 'dummy',
        email: 'dummy.user@email.com',
        password: 'secret'
    };

    beforeEach(() => {
        create = sinon.stub(User, 'create');
        hash = sinon.stub(bcrypt, 'hash');
        sign = sinon.stub(jwt, 'sign');
    });

    afterEach(() => {
        create.restore();
        hash.restore();
        sign.restore();
        sinon.reset();
    });

    it('Should register a new user', (done) => {
        create.yields(null, dummyUser);
        hash.yields(null, 'secret');
        sign.returns('my-token');

        register(dummyUser.email, dummyUser.name, dummyUser.password)
        .then((token) => {
            expect(token).to.equal('my-token');
            done();
        });
    });

    it('Should return Password is required', async () => {
        create.yields(null, dummyUser);
        hash.yields(null, 'secret');
        sign.returns('my-token');

        await register(dummyUser.email, dummyUser.name, null)
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('Password is required');
            expect(error.code).to.equal(403);
        });
    });

    it('Should return Email is required', async () => {
        create.yields(null, dummyUser);
        hash.yields(null, 'secret');
        sign.returns('my-token');

        await register(null, dummyUser.name, dummyUser.password)
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('Email is required');
            expect(error.code).to.equal(403);
        });
    });

    it('Should return a Token-hash error', async () => {
        create.yields(null, dummyUser);
        hash.yields(new Error('Token error'));
        sign.returns('my-token');

        await register(dummyUser.name, dummyUser.name, dummyUser.password)
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('Token error - hash');
            expect(error.code).to.equal(403);
        });
    });

    it('Should return a Database error', async () => {
        create.yields(new Error('Database error'));
        hash.yields(null, 'secret');
        sign.returns('my-token');

        await register(dummyUser.name, dummyUser.name, dummyUser.password)
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('Database error');
            expect(error.code).to.equal(500);
        });
    });

    it('Should return a Token-jwt error', async () => {
        create.yields(null, dummyUser);
        hash.yields(null, 'secret');
        sign.returns(Promise.reject('Token Error'));

        await register(dummyUser.name, dummyUser.name, dummyUser.password)
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('Token error - jwt');
            expect(error.code).to.equal(403);
        });
    });
});