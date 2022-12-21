const passport = require('passport');
const httpStatus = require('http-status');

const APIError = require('../helpers/ApiError');

const handleJWT = (req, res, next, module) => async (err, user, info) => {
  const error = err || info;
  const apiError = new APIError({
    message: error ? error.message : 'Unauthorized',
    status: httpStatus.UNAUTHORIZED,
    stack: error ? error.stack : undefined,
  });

  if (err || !user) {
    return next(apiError)
  }
  console.log(user);
  if (user.role.modules.includes('*')) {
    req.user = user;
    return next();
  }
  if (user.modules.includes(module) || user.role.modules.includes(module)) {
    req.user = user;
    return next();

  }
  return next(apiError);
};

exports.Authorize = (module) => (req, res, next) => passport.authenticate('jwt',
  { session: false },
  handleJWT(req, res, next, module))(req, res, next);