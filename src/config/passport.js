const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../api/users/user.model');
const { JWT_SECRET } = require('../config/env-vars');

const JwtOptions = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const JWT = async (payload, done) => {
  try {
    const user = await User.findById(payload.id).populate('role').lean();
    if (!user) {
      done(new Error('User not found', false));
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
};

exports.Jwt = new Strategy(JwtOptions, JWT);