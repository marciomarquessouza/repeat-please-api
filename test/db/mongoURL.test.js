const mongoURL = require('../../src/db/mongoURL');
const { expect } = require('chai');

describe('db/mongoURL.js - mongoDB Cloud', () => {
    const cloudDBParameters = {
        user: 'dummyUser',
        pass: 'dummyPass',
        database: 'dummyDB'
      };

    const CLOUD_DB_URL = 'mongodb+srv://DATABASE_USER:DATABASE_PASS@cluster0-xtseo.mongodb.net/DATABASE_NAME?retryWrites=true';

    it('Should return Mongo URL with user, pass and database', () => {  
        expect(mongoURL(
            CLOUD_DB_URL,
            cloudDBParameters.database,
            cloudDBParameters.user,
            cloudDBParameters.pass,
            ))
        .to.equal('mongodb+srv://dummyUser:dummyPass@cluster0-xtseo.mongodb.net/dummyDB?retryWrites=true'); 
    });
});

describe('db/mongoURL.js - localhost', () => {
    const localDBParameters = {
        user: '',
        pass: '',
        database: 'dummyDB'
      };

    const LOCAL_DB_URL = 'mongodb://localhost:27017/DATABASE_NAME';

    it('Should return Mongo URL with user, pass and database', () => {  
        expect(mongoURL(
            LOCAL_DB_URL,
            localDBParameters.database,
            localDBParameters.user,
            localDBParameters.pass
            ))
        .to.equal('mongodb://localhost:27017/dummyDB');
    });
});
