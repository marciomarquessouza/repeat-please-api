const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../src/db/models/users/user');
const login = require('../../src/auth/login');

describe('auth/login.js', () => {

    let find, compareSync, sign;
    const dummyUser = {
        _id: 'dummy_id',
        name: 'dummy',
        email: 'dummy.user@email.com',
        password: 'secret'
    };

    beforeEach(() => {
        compareSync = sinon.stub(bcrypt, 'compareSync');
        find = sinon.stub(User, 'findOne');
        sign = sinon.stub(jwt, 'sign');
    });

    afterEach(() => {
        find.restore();
        compareSync.restore();
        sign.restore();
        sinon.reset()
    });

    it('Should return an User', (done) => {
        compareSync.returns(true);
        find.yields(null, dummyUser);
        sign.returns('my-token');

        login(dummyUser.email, dummyUser.password).then((token) => {
            expect(token).to.equal('my-token');
            done();
        })
        .catch((error) => {
            throw new Error(error.message);
        });
    });

    it('Should return an Error', async () => {
        compareSync.returns(true);
        find.yields(new Error('Sinon Error'));
        sign.returns('my-token');

        await login(dummyUser.email, dummyUser.password)
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('Database Error');
            expect(error.code).to.equal(500);
        });
    });

    it('Should return User Not Found', async () => {
        compareSync.returns(true);
        find.yields(null, null);
        sign.returns('my-token');

        await login(dummyUser.email, dummyUser.password)
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('User not found');
            expect(error.code).to.equal(404);
        })
    });

    it('Should return password required', async () => {
        compareSync.returns(true);
        find.yields(null, dummyUser);
        sign.returns('my-token');

        await login(dummyUser.email, null)
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('Password required');
            expect(error.code).to.equal(403);
        });
    });

    it('Should return Unauthorized', async () => {
        compareSync.returns(false);
        find.yields(null, dummyUser);
        sign.returns('my-token');

        await login(dummyUser.email, dummyUser.password)
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('Unauthorized');
            expect(error.code).to.equal(403);
        });
    });

    it('Should return a token error', async () => {
        compareSync.returns(true);
        find.yields(null, dummyUser);
        sign.returns(Promise.reject('Token Error'));

        await login(dummyUser.email, dummyUser.password)
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('Token Error');
            expect(error.code).to.equal(500);
        });
    });
});
