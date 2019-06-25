const { expect } = require('chai');
const responses = require('../../../src/middlewares/responses');

describe('/middleware/responses/errorHandler', () => {
    it('Should stop in headerSent', () => {
        const next = error => error;
        const err = new Error('Generic Error');
        const response = responses.errorHandler(err, null, { headersSent: true }, next)
        expect(response).to.be.an('error');
        expect(response.message).to.equal('Generic Error');
    })
})