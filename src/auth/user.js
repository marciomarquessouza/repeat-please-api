const User = require('../models/user');

module.exports = (req, res) => User.findOne({
    _id: req.userId
}, (error, user) => {
    if (error) {
        res.status(404).json({
            status: 404,
            message: 'User was not found'
        });
    }
    res.status(200).json({
        status: 200,
        name: user.name,
        email: user.email
    });
});
