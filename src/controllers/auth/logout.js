const Response = require('../../models/responses/Response');

module.exports.logout = (req, res) => {
    const response = new Response(res, 'Logout', 200, true);
    response.send();
};
