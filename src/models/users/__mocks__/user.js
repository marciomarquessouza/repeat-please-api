/* eslint-disable */

module.exports = {
    findOne: ({ email }, callback) => {
        if (!email) {
            return callback(new Error('Not Found'));
        }

        console.log('MOCK USER');
        
        return (null, {
            _id: '5ca567594c93b74b7cbbd2cf',
            email: 'dummy.user@email.com',
            name: 'dummy',
            password: '$2a$08$mxE1aCPIIScafPmyVQT.menFTiBv2kf0jwleSMcGhSOG.Z4ihkyEy'
        });
    }
};

