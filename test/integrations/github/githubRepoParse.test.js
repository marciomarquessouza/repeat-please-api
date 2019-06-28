const githubRepoParse = require('../../../src/integrations/github/parses/githubRepoParse');
const { expect } = require('chai');
const githubResponse = require('./githubResponse.json');

describe('integrations/github/parses/githubRepoParse', () => {
    
    it('Should return a normalized reponse from github', () => {
        const response = githubRepoParse(JSON.stringify(githubResponse));
        expect(response).to.deep.equal({
            "avatar": "https://avatars1.githubusercontent.com/u/9871170?v=4",
            "id": 164380029,
            "name": "repeat-please",
            "stars": 2,
            "url": {
                "owner": "https://api.github.com/users/marciomarquessouza",
                "repo": "https://github.com/marciomarquessouza/repeat-please"
            },
            "watchers": 2
        });
    });

    it('Should return a parse error with code 502', () => {
        try {
            githubRepoParse(githubResponse);    
        } catch (error) {
            expect(error).to.be.an('error');
            expect(error.code).to.be.equal(502);
            expect(error.message).to.be.equal('Unexpected token o in JSON at position 1');
        }
    })
});
