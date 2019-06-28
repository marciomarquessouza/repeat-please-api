const token = require('../../../src/services/auth/token');
const sinon = require('sinon')
const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

describe('auth/token', () => {
    const dummyUser = {
        _id: 'dummy_id',
        name: 'dummy',
        email: 'dummy.user@email.com',
        password: 'secret'
    };
    let sign, verify, compare, hash;

    beforeEach(() => {
        sign = sinon.stub(jwt, 'sign');
        verify = sinon.stub(jwt, 'verify');
        compare = sinon.stub(bcrypt, 'compare');
        hash = sinon.stub(bcrypt, 'hash');
    })

    afterEach(() => {
        sign.restore();
        verify.restore();
        compare.restore();
        hash.restore();
    })

    it('Should create a new token', (done) => {
        sign.returns('my-token');
        token.create(dummyUser._id)
        .then((response) => {
            expect(response).to.be.equal('my-token');
            done();
        });
    });

    it('Should return an error trying to create a new token', async () => {
        sign.returns(undefined);
        await token.create(dummyUser._id)
        .then(() => {
            throw new Error('Erro was not generated');
        })
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.status).to.be.equal(500);
        })
    });

    it('Should verify and decode a new token', (done) => {
        verify.yields(null, { id: dummyUser._id });
        token.verify('my-token', (error, decoded) => {
            expect(decoded.id).to.be.equal(dummyUser._id);
            done();
        });
    });

    it('Should return a error on token verification', async () => {
        verify.yields(new Error('Invalid Token'));
        await token.verify('my-token', null, (error) => {
            expect(error).to.be.an('error');
            expect(error.status).to.be.equal(401);
        });
    });

    it('Should compares the user and db password', (done) => {
        compare.yields(null, true);
        token.checkPass(dummyUser.password, dummyUser.password)
        .then((result) => {
            expect(result).to.be.true;
            done();
        });
    });

    it('Sould return a error on password comparing', async () => {
        compare.yields(new Error('Error comparing passwords'));
        await token.checkPass(dummyUser.password, dummyUser.password)
        .then(() => {
            throw new Error('Erro was not generated');
        })
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.status).to.be.equal(500);
        })
    });

    it('Should return Unauthorized', async () => {
        compare.yields(null, false);
        await token.checkPass(dummyUser.password, dummyUser.password)
        .then(() => {
            throw new Error('Error was not generated');
        })
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.status).to.be.equal(401);
        })
    });

    it('Should hash the user password', (done) => {
        hash.yields(null, 'hash_password');
        token.hash(dummyUser.password)
        .then((hashPass) => {
            expect(hashPass).to.be.equal('hash_password')
            done();
        });
    });

    it('Should return a error on hash creattion', async () => {
        hash.yields(new Error('Token error - hash'));
        await token.hash(dummyUser.password)
        .then((hashPass) => {
            throw new Error('Erro was not generated');
        })
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.status).to.be.equal(500);
        })
    })
});
