require('dotenv').config()

module.exports = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION_MINUTES,
  MONGO_URI: process.env.MONGO_URI,
}