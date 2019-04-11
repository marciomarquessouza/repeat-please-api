const expect = require('chai').expect;
const sinon = require('sinon');
const User = require('../../src/models/users/user');
const login = require('../../src/auth/login');

describe('src/auth/login.js', () => {
    it('Should return the User', (done)=> {
        const user = {
            _id: 'my_id',
            name: 'name',
            email: 'name@email.com',
            password: 'secret'
        };
        sinon.stub(User, 'findOne').yields(null, user);

        login(user.email, user.password).then((token) => {
            expect(token).to.equal('my-token');
            done();
        })
    })
})