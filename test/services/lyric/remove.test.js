const { expect } = require('chai');
const sinon = require('sinon');
const lyricService = require('../../../src/services/lyric');
const { Lyric } = require('../../../src/models/lyrics/Lyric');

const id1 = 'myID01';
const id2 = 'myID02';

describe('services/lyric/remove', () => {
    
    let deleteOne, deleteMany;
    
    beforeEach(() => {
        deleteOne = sinon.stub(Lyric, 'deleteOne');
        deleteMany = sinon.stub(Lyric, 'deleteMany');
    });

    afterEach(() => {
        deleteOne.restore();
        deleteMany.restore();
    });

    it('Should delete one Lyric', async () => {
        deleteOne.returns(Promise.resolve({ deletedCount: 1 }))
        await lyricService.removeByID(id1)
        .then((result) => {
            expect(result.deletedCount).to.be.equal(1);
        })
    });

    it('Should return Lyric not found', async () => {
        deleteOne.returns(Promise.resolve({ deletedCount: 0 }))
        await lyricService.removeByID(id1)
        .catch((err) => {
            expect(err).to.be.an('error');
            expect(err.message).to.be.equal('Lyric not found');
        });
    });

    it('Should return ID is required', async () => {
        await lyricService.removeByID()
        .catch((err) => {
            expect(err).to.be.an('error');
            expect(err.message).to.be.equal('ID is required');
        });
    });

    it('Should return a default server error', async () => {
        deleteOne.returns(Promise.reject(new Error('Internal Server Error')))
        await lyricService.removeByID(id1)
        .catch((err) => {
            expect(err).to.be.an('error');
            expect(err.message).to.be.equal('Internal Server Error');
        });
    });

    it('Should delete more than one lyric by multiple ids', async () => {
        deleteMany.returns(Promise.resolve(true));
        await lyricService.removeList([id1, id2])
        .then((result) => {
            expect(result).to.be.true;
        });
    });

    it("Should return 'Body is required'", async () => {
        await lyricService.removeList('id')
        .catch((err) => {
            expect(err).to.be.an('error');
            expect(err.message).to.be.equal('Body is required');
        });
    });

    it('Should return a default error', async () => {
        deleteMany.returns(Promise.reject(new Error('Internal Server Error')));
        await lyricService.removeList([id1, id2])
        .catch((err) => {
            expect(err).to.be.an('error');
            expect(err.message).to.be.equal('Internal Server Error');
        });
    });
})