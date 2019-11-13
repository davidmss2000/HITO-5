const jwt = require('jsonwebtoken');

const secret = 'dummySecretPUBLIC@GITHUB';

const tokenExpiration = (60000 * 60); // 1 hour (in milliseconds)

function createToken(foundUser) {
  return jwt.sign({
    // eslint-disable-next-line no-underscore-dangle
    auth: foundUser._id,
    exp: Date.now() + tokenExpiration,
  }, secret);
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return { err: 'not authorized' };
  }
}

module.exports = {
  createToken,
  verifyToken,
};
