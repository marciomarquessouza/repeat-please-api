module.exports = async (req, res, message) => {
    await res.status(200).json({
      status: 200,
      message
    });
  };
