module.exports = {
    port: process.env.PORT || 5000,
    database: {
        name: process.env.DATABASE_NAME || 'repeat-please-test',
        server: process.env.DATABASE_SERVER || 'Local Server',
        rawURL:
        process.env.DATABASE_URL || 'mongodb://localhost:27017/DATABASE_NAME',
        localURL: 'mongodb://localhost:27017/DATABASE_NAME',
        user: process.env.DATABASE_USER || '',
        pass: process.env.DATABASE_PASS || '',
        repeatLocal:
        process.env.DATABASE_REPEAT_LOCAL || false
    },
    github: {
        user: process.env.GIT_USER,
        pass: process.env.GIT_PASS
    },
    token: {
        secret: process.env.SECRET || 'secret',
        expires: 900
    }
};
