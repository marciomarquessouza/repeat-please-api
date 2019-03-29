const mongoURL = require('../../src/db/mongoURL');

describe('mongoURL.js - mongoDB Cloud', () => {
    const cloudDBParameters = {
        user: 'dummyUser',
        pass: 'dummyPass',
        database: 'dummyDB'
      };

    const CLOUD_DB_URL = 'mongodb+srv://DATABASE_USER:DATABASE_PASS@cluster0-xtseo.mongodb.net/DATABASE_NAME?retryWrites=true';
  
    it('Should return Mongo URL with user, pass and database', () => {  
        expect(mongoURL(
            cloudDBParameters.database,
            cloudDBParameters.user,
            cloudDBParameters.pass,
            CLOUD_DB_URL
            ))
        .toBe('mongodb+srv://dummyUser:dummyPass@cluster0-xtseo.mongodb.net/dummyDB?retryWrites=true'); 
    });

    it('Should return Mongo Url when the user doesnt send the raw URL', () => {
        expect(mongoURL(
            cloudDBParameters.database,
            cloudDBParameters.user,
            cloudDBParameters.pass
            ))
        .toBe('mongodb+srv://dummyUser:dummyPass@cluster0-xtseo.mongodb.net/dummyDB?retryWrites=true');
    });  
});

describe('mongoURL.js - localhost', () => {
    const localDBParameters = {
        user: '',
        pass: '',
        database: 'dummyDB'
      };

    const LOCAL_DB_URL = 'mongodb://localhost:27017/DATABASE_NAME';
    
    it('Should return Mongo URL with user, pass and database', () => {  
        expect(mongoURL(
            localDBParameters.database,
            localDBParameters.user,
            localDBParameters.pass,
            LOCAL_DB_URL
            ))
        .toBe('mongodb://localhost:27017/dummyDB'); 
    });
})
