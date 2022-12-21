const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helpers/ApiError');

const pick = (object, keys) => keys.reduce((obj, key) => {
  if (object && Object.prototype.hasOwnProperty.call(object, key)) {
    // eslint-disable-next-line no-param-reassign
    obj[key] = object[key];
  }
  return obj;
}, {});

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError({
      status: httpStatus.BAD_REQUEST,
      message: errorMessage,
    }));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;