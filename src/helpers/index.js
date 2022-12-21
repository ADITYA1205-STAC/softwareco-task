const Jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPIRATION } = require('../config/env-vars');

const signToken = (payload) => {
  return Jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

const verifyToken = (token) => {
  return Jwt.verify(token, JWT_SECRET, { ignoreExpiration: false });
}

module.exports = {
  signToken,
  verifyToken,
}