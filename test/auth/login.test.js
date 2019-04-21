const { expect } = require('chai');
const sinon = require('sinon');
const User = require('../../src/models/users/User');
const login = require('../../src/auth/login');
const token = require('../../src/auth/token');
const AuthError = require('../../src/errors/AuthError');

describe('auth/login.js', () => {

    let find, checkPass, create;
    const dummyUser = {
        _id: 'dummy_id',
        name: 'dummy',
        email: 'dummy.user@email.com',
        password: 'secret'
    };

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

    it('Should return an User Token', (done) => {
        find.yields(null, dummyUser);
        checkPass.returns(Promise.resolve(true));
        create.returns(Promise.resolve('my-token'));

        login(dummyUser.email, dummyUser.password).then((token) => {
            expect(token).to.equal('my-token');
            done();
        })
        .catch((error) => {
            throw new Error(error.message);
        });
    });

    it('Should return an Database Error', async () => {
        find.yields(new Error('Sinon Error'));
        checkPass.returns(Promise.resolve(true));
        create.returns(Promise.resolve('my-token'));

        await login(dummyUser.email, dummyUser.password)
        .then(() => {
            throw new Error('Erro was not generated');
        })
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('Database Error');
            expect(error.code).to.equal(500);
        });
    });

    it('Should return User Not Found', async () => {
        find.yields(null, null);
        checkPass.returns(Promise.resolve(true));
        create.returns(Promise.resolve('my-token'));

        await login(dummyUser.email, dummyUser.password)
        .then(() => {
            throw new Error('Erro was not generated');
        })
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('User not found');
            expect(error.code).to.equal(404);
        })
    });

    it('Should return Unauthorized', async () => {
        find.yields(null, dummyUser);
        checkPass.returns(Promise.reject(new AuthError('Unauthorized', 403)));
        create.returns(Promise.resolve('my-token'));

        await login(dummyUser.email, dummyUser.password)
        .then(() => {
            throw new Error('Erro was not generated');
        })
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('Unauthorized');
            expect(error.code).to.equal(403);
        });
    });

    it('Should return a token error', async () => {
        find.yields(null, dummyUser);
        checkPass.returns(Promise.resolve(true));
        create.returns(Promise.reject(new AuthError('Token creation error', 500)));

        await login(dummyUser.email, dummyUser.password)
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('Token creation error');
            expect(error.code).to.equal(500);
        });
    });
});
