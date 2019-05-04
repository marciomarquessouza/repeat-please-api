const sinon = require('sinon');
const chai = require('chai');
const auth = require('../../src/auth/auth');
const authControllers = require('../../src/controllers/authControllers');

const dummyUser = {
    _id: 'dummy_id',
    name: 'dummy',
    email: 'dummy.user@email.com',
    password: 'secret'
};
const req = {
    body: {
        email: dummyUser.email,
        name: dummyUser.name,
        password: dummyUser.password
    }
};
let register;

beforeEach(() => {
    register = sinon.stub(auth, 'register');
});

afterEach(() => {
    register.restore();
});

describe('controllers/authControllers', () => {
    it('Should answer 201 - ok', (done) => {
        register.returns(Promise.resolve('my-token'));
    });
});