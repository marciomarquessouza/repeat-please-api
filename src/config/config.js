module.exports = {
    port: process.env.PORT || 5000,
    database: {
        name: process.env.DATABASE,
        url: process.env.DATABASE_URL
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
