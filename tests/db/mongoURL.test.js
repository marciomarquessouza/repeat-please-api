const mongoURL = require('../../src/db/mongoURL');

describe('mongoURL.js', () => {
    const dbParameters = { 
        user: 'dummyUser', 
        pass: 'dummyPass', 
        database: 'dummyDB'
      };

    const dbURL = 'mongodb+srv://DATABASE_USER:DATABASE_PASS@cluster0-xtseo.mongodb.net/DATABASE_NAME?retryWrites=true';
  
    it('Should return Mongo URL with user, pass and database', () => {  
        expect(mongoURL(dbParameters.database, dbParameters.user, dbParameters.pass, dbURL))
        .toBe('mongodb+srv://dummyUser:dummyPass@cluster0-xtseo.mongodb.net/dummyDB?retryWrites=true'); 
    });

    it('Should return Mongo Url when the user doesnt send the raw URL', () => {
        expect(mongoURL(dbParameters.database, dbParameters.user, dbParameters.pass))
        .toBe('mongodb+srv://dummyUser:dummyPass@cluster0-xtseo.mongodb.net/dummyDB?retryWrites=true');
    });

    it('Should return an error message when a argument is missing', () => {
        try {
            mongoURL(dbParameters.database, dbParameters.user);
        } catch(e) {
            expect(e).toEqual(Error("There're 1 missing args"));
        }
    });
  
})
