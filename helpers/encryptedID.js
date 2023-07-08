const crypto = require('crypto');
require('dotenv').config();

exports.encryptID = (id) => {
  const cipher = crypto.createCipher('aes-256-cbc', process.env.SECRET_KEY);
  let encryptedID = cipher.update(id.toString(), 'utf8', 'hex');
  encryptedID += cipher.final('hex');
  return encryptedID;
};
exports.decryptID = (encryptedID) => {
  const decipher = crypto.createDecipher('aes-256-cbc', process.env.SECRET_KEY);
  let decryptedID = decipher.update(encryptedID, 'hex', 'utf8');
  decryptedID += decipher.final('utf8');
  return decryptedID;
};
