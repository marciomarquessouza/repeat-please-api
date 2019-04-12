module.exports = {
    sign: (userId, secret, expireIn) => 'my-token',
    verify: (token, secret, callback) => {        
        if (!token) {
            return callback(new Error('Internal Error'));
        }

        callback(null, { id: '746573742d69642d75736572' });
    }
};