const Joi = require('joi');

const addRole = {
  body: {
    modules: Joi.array().items(Joi.string()).required(),
  }
}

const createRole = {
  body: {
    name: Joi.string().required(),
    modules: Joi.array().items(Joi.string()).required(),
  }
}

module.exports = {
  addRole,
  createRole
}