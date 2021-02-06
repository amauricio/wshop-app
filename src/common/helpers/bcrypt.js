const bcrypt = require('bcryptjs');

const encrypt = (value) =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err.message);
      bcrypt.hash(value, salt, (err, hash) => {
        if (err) return reject(err.message);
        resolve(hash);
      });
    });
  });

const generateToken = (length) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

const compare = (a, b) => bcrypt.compare(a, b);

module.exports = {
  generateToken,
  encrypt,
  compare,
};
