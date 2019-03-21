const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).json({
            auth: false,
            code: 403,
            message: 'Token was not found'
        });
    }

    const secret = process.env.SECRET;

    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            return res.status(500).json({
                auth: false,
                code: 500,
                message: 'Internal Error'
            });
        }

        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;
