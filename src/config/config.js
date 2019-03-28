module.exports = {
    port: process.env.PORT || 5000,
    database: {
        name: process.env.DATABASE_NAME,
        rawUrl: process.env.DATABASE_URL,
        user: process.env.DATABASE_USER,
        pass: process.env.DATABASE_PASS
    },
    github: {
        user: process.env.GIT_USER,
        pass: process.env.GIT_PASS
    },
    token: {
        secret: process.env.SECRET,
        expires: 900
    }
};
