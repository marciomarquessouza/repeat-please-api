const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (userId, expiresIn = config.token.expires) => {
    const token = jwt.sign(
        { id: userId },
        config.token.secret,
        { expiresIn }
    );

    return new Promise((resolve, reject) => {
      if (token) {
          return resolve(token);
      }

      return reject(new Error('Error to gererate Token'));
    });
};
