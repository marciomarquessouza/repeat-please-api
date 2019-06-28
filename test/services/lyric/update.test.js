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

describe('services/lyric/update', () => {
    let findOneAndUpdate;

    beforeEach(() => {
        findOneAndUpdate = sinon.stub(Lyric, 'findOneAndUpdate');
    });

    afterEach(() => {
        findOneAndUpdate.restore();
    });

    it("Should update an entire lyric by ID", async () => {
        const _id = 'my_id';
        findOneAndUpdate.returns(dummyLyric);
        await lyricService.update({ _id }, dummyLyric)
        .then((lyricResult) => {
            expect(lyricResult).to.deep.equal(dummyLyric);
        });
    });

    it("Should update an entire lyric by Title", async () => {
        findOneAndUpdate.returns(dummyLyric);
        await lyricService.update({ title: dummyLyric.title }, dummyLyric)
        .then((lyricResult) => {
            expect(lyricResult).to.deep.equal(dummyLyric);
        });
    });

    it("Should return a 404 error (Not Found)", async () => {
        findOneAndUpdate.returns(null);
        await lyricService.update({ _id: 'fake_id'}, dummyLyric)
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.be.equal('Lyric not Found');
            expect(error.status).to.be.equal(404);
        });
    });

    it("Should return 400 when the id is null", async () => {
        await lyricService.update(null, dummyLyric)
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.be.equal('ID is required');
            expect(error.status).to.be.equal(400);
        });
    });

    it("Should return 400 when the new Lyric is null", async () => {
        await lyricService.update({ _id: 'fake_id'})
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.be.equal('New Lyric is required');
            expect(error.status).to.be.equal(400);
        });
    });
});

