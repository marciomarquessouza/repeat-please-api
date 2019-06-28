const { expect } = require('chai');
const sinon = require('sinon');
const lyricService = require('../../../src/services/lyric');
const { Lyric } = require('../../../src/models/lyrics/Lyric');

const dummyLyric = {
    title: 'Dummy Title',
    lines: [
        {
            line: 'dummy line 1',
            start: 10,
            end: 20,
            duration: 10
        }
    ]
};

const dummyLyric2 = {
    title: 'Dummy Title2',
    lines: [
        {
            line: 'dummy line 1',
            start: 10,
            end: 20,
            duration: 10
        }
    ]
};

describe('services/lyric/fetch', () => {
    let findOne;

    beforeEach(() => {
        findOne = sinon.stub(Lyric, 'findOne');
        find = sinon.stub(Lyric, 'find');
    });

    afterEach(() => {
        findOne.restore();
        find.restore();
    });

    it("Should return a Lyric object found by ID", async () => {
        findOne.returns(dummyLyric);
        await lyricService.fetchByID('lyricID')
        .then((lyricResponse) => {
            expect(lyricResponse).to.deep.equal(dummyLyric);
        });
    });

    it("Should return an error (Lyric not found)", async () => {
        findOne.returns(null);
        await lyricService.fetchByID('lyricID')
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('No Results');
            expect(error.status).to.equal(404);
        })
    });

    it("Should return a 500 error - Internal Error", async () => {
        findOne.returns(Promise.reject(new Error('Internal Error')));
        await lyricService.fetchByID('lyricID')
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.status).to.equal(500);
        })
    });

    it("Should return a list of Lyrics", async () => {
        find.returns({
            skip: sinon.stub().returnsThis(),
            limit: sinon.stub().returns([dummyLyric, dummyLyric2])
        });
        await lyricService.fetch({ limit: 10, skip: 0})
        .then((lyrics) => {
            expect(lyrics).to.deep.equal([dummyLyric, dummyLyric2]);
        });
    });

    it("Should return a list of Lyrics when the limit and skip are null", async () => {
        find.returns({
            skip: sinon.stub().returnsThis(),
            limit: sinon.stub().returns([dummyLyric, dummyLyric2])
        });
        await lyricService.fetch({})
        .then((lyrics) => {
            expect(lyrics).to.deep.equal([dummyLyric, dummyLyric2]);
        });
    });

    it("Should return a not found error (404)", async () => {
        find.returns({
            skip: sinon.stub().returnsThis(),
            limit: sinon.stub().returns([])
        });
        await lyricService.fetch({})
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.be.equal('No Results');
            expect(error.status).to.be.equal(404);
        })
    });

    it("Should return 500 - Server Error", async () => {
        find.returns({
            skip: sinon.stub().returnsThis(),
            limit: sinon.stub().returns(Promise.reject(new Error('Server Error')))
        });
        await lyricService.fetch({})
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.status).to.be.equal(500);
        })
    });
});