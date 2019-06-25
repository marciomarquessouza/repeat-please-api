const sendResponse = (res, status) => {
    res.status(status.code)
    .json({
        auth: true,
        message: status.desc,
        token: res.locals.token || null,
        body: res.locals.body || null
    })
    .end();
};

const get = (req, res) => sendResponse(res, { code: 200, desc: 'OK' });
const fetch = (req, res) => sendResponse(res, { code: 200, desc: 'Fetched' });
const create = (req, res) => sendResponse(res, { code: 201, desc: 'Created' });
const update = (req, res) => sendResponse(res, { code: 200, desc: 'Updated' });

module.exports = {
    get,
    fetch,
    create,
    update
};
