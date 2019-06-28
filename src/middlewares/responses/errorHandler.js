// no-unused-vars
module.exports.errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const status = err.status || 500;
    const message = err.message || 'Server Error';

    res.status(status)
    .json({
        auth: false,
        message,
        token: null,
        body: null
    })
    .end();
};
