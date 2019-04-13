const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../src/db/models/users/user');
const login = require('../../src/auth/login');

describe('src/auth/login.js', () => {

    let find;
    let compareSync;
    let sign;
    const dummyUser = {
        _id: 'dummy_id',
        name: 'dummy',
        email: 'dummy.user@email.com',
        password: 'secret'
    };

    beforeEach(() => {
        find = sinon.stub(User, 'findOne').yields(null, dummyUser);
        compareSync = sinon.stub(bcrypt, 'compareSync').returns(true);
        sign = sinon.stub(jwt, 'sign').returns('my-token');
    });
    
    afterEach(() => {
        find.restore();
        compareSync.restore();
        sign.restore();
        sinon.reset()
    });

    it('Should return the User', (done) => {

        login(dummyUser.email, dummyUser.password).then((token) => {
            expect(token).to.equal('my-token');
            done();
        })
        .catch((error) => {
            throw new Error(error.message);
        });
    });
});
