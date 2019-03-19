const logout = (req, res) => res.status(200).json({
        auth: false,
        code: 200,
        message: 'Logout',
        token: null
    });

module.exports = logout;
