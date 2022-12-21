const httpStatus = require('http-status');
const ApiError = require('../helpers/ApiError');
const config = require('../config/env-vars');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.code || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError({
      message,
      stack: err.stack,
      code: statusCode,
    });
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { status, message } = err;
  if (config.NODE_ENV === 'production' && !err.isOperational) {
    status = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: status,
    message,
    ...(config.NODE_ENV === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(status).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
