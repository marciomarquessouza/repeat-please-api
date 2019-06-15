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

describe('services/lyric/create', () => {
    let create;

    beforeEach(() => {
        create = sinon.stub(Lyric, 'create');
    });

    afterEach(() => {
        create.restore();
    });

    it('Should return a new Lyric object', async () => {
        create.returns(Promise.resolve({ title: 'Dummy Title'}));
        await lyricService.create(dummyLyric)
        .then((lyricResponse) => {
            expect(lyricResponse).to.deep.equal({ title: 'Dummy Title' });
        });
    });

    it('Should return an error to create Lyric object', async () => {
        await lyricService.create({ title: "" })
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('Title is required');
        });
    });

    it('Should return a Database Error', async () => {
        create.returns(Promise.reject(new Error('DB Error')));
        await lyricService.create(dummyLyric)
        .catch((error) => {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('DB Error');
        });
    });
});