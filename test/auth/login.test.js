/* eslint-disable */

const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../src/db/models/users/user');
const login = require('../../src/auth/login');

describe('src/auth/login.js', () => {

    let find, compareSync, sign;
    const dummyUser = {
        _id: 'dummy_id',
        name: 'dummy',
        email: 'dummy.user@email.com',
        password: 'secret'
    };

    beforeEach(() => {
        compareSync = sinon.stub(bcrypt, 'compareSync').returns(true);
        sign = sinon.stub(jwt, 'sign').returns('my-token');
    });
    
    afterEach(() => {
        find.restore();
        compareSync.restore();
        sign.restore();
        sinon.reset()
    });

    it('Should return an User', (done) => {
        find = sinon.stub(User, 'findOne').yields(null, dummyUser);
        login(dummyUser.email, dummyUser.password).then((token) => {
            expect(token).to.equal('my-token');
            done();
        })
        .catch((error) => {
            throw new Error(error.message);
        });
    });

    it('Should return an Error', async () => {
        find = sinon.stub(User, 'findOne').yields(new Error('Sinon Error'));

        await login(dummyUser.email, dummyUser.password)
        .catch((error) => {
            expect(error).to.be.an('error');
        });
    });

    it('Should return an Database Error Message', async () => {
        find = sinon.stub(User, 'findOne').yields(new Error('Sinon Error'));

        await login(dummyUser.email, dummyUser.password)
        .catch((error) => {
                expect(error.message).to.equal('Database Error');
        });
    });
});
