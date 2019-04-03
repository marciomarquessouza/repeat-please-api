module.exports = (req, res, message) => {
    res.status(200).json({
      status: 200,
      message
    });
  };
