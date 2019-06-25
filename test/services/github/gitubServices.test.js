const { expect } = require('chai');
const sinon = require('sinon');
const githubService = require('../../../src/services/github');
const github = require('../../../src/integrations/github/githubIntegration')

describe('services/github/githubService', () => {
    const user = 'dummyuser';
    const repoName = 'dymmyrepo';
    let repo;

    beforeEach(() => {
        repo = sinon.stub(github, 'repo');
    });

    afterEach(() => {
        repo.restore();
    })

    it('Should return the github repository response', (done) => {
        repo.returns(Promise.resolve({ name: 'repeat-please'}));
        githubService.fetch(user, repoName)
        .then((repoResponse) => {
            expect(repoResponse).to.deep.equal({ name: 'repeat-please'});
            done();
        });
    });

    it('Should return a error from github', async () => {
        repo.returns(Promise.reject(new Error('Github Error')));
        await githubService.fetch(user, repoName)
        .then(() => {
            throw new Error('Erro was not generated');
        })
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('Github Error');
        });
    });

    it('Should return a default error', async () => {
        repo.returns(Promise.reject(new Error('')));
        await githubService.fetch(user, repoName)
        .then(() => {
            throw new Error('Erro was not generated');
        })
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('Internal Server error');
        });
    })
});
