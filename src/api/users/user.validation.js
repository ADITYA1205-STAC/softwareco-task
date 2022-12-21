const Joi = require('joi');

const login = {
  body: {
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(8).required(),
  }
}

const register = {
  body: {
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().required(),
  }
}

module.exports = {
  login,
  register,
}