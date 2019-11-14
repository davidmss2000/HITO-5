/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');

const secret = 'dummySecretPUBLIC@GITHUB';

const tokenExpiration = (60000 * 60); // 1 hour (in milliseconds)

function createToken(user) {
  return jwt.sign({
    auth: user._id,
    exp: Date.now() + tokenExpiration,
  }, secret);
}

function verifyToken(token) {
  let decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch (err) {
    return { err: err.message };
  }
  if (decoded.exp === undefined) return { err: 'unauthorized' };
  if (decoded.exp < Date.now()) return { err: 'token expired' };
  return { decoded };
}

module.exports = {
  createToken,
  verifyToken,
};
