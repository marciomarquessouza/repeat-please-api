const { expect } = require('chai');
const sinon = require('sinon');
const User = require('../../src/models/users/User');
const authUser = require('../../src/auth/user');

describe('auth/user.js', () => {

    let find;
    const dummyUser = {
        _id: 'dummy_id',
        name: 'dummy',
        email: 'dummy.user@email.com',
        password: 'secret'
    };

    beforeEach(() => {
        find = sinon.stub(User, 'findOne');
    });

    afterEach(() => {
        find.restore();
    })

    it('Should return a authenticated user', (done) => {

        find.yields(null, dummyUser);

        authUser(dummyUser._id)
        .then((user) => {
            expect(user).to.be.an('object');
            expect(user).to.deep.equal(dummyUser);
            done();
        })
        .catch((error) => {
            done(error);
        });
    });

    it('Should not return the user password', (done) => {

        find.yields(null, dummyUser);

        authUser(dummyUser._id)
        .then((user) => {
            expect(user).to.be.an('object');
            expect(user.password).to.be.undefined;
            done();
        })
        .catch((error) => {
            done(error);
        });
    });

    it('Should return a database error', async () => {
        find.yields(new Error('Sinon Error'));

        await authUser(dummyUser._id)
        .then(() => {
            throw new Error("Error wasn't reached");
        })
        .catch((error) => {
            expect(error).to.be.an('error')
            expect(error.code).to.equal(500);
            expect(error.message).to.equal('Database Error');
        });
    });

    it('Should return User Not Found', async () => {
        find.yields(null, null);

        await authUser(dummyUser._id)
        .then(() => {
            throw new Error("Error wasn't reached");
        })
        .catch((error) => {
            expect(error).to.be.an('error')
            expect(error.code).to.equal(404);
            expect(error.message).to.equal('User not found');
        });
    });
});