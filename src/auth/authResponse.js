module.exports = (
    res,
    message,
    status = 500,
    auth = false,
    token = null
    ) => {
    res.status(status).json({
        auth,
        message,
        token
    });
};
