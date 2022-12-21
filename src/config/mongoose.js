const mongoose = require('mongoose');
const { ENV, MONGO_URI } = require('./env-vars');

mongoose.Promise = global.Promise;

mongoose.set('debug', ENV === 'development');

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB Connection Error ${err}`);
});

mongoose.connection.on('connected', () => {
  console.info('Connected To DB');
});

exports.Connect = () => {
  mongoose.connect(MONGO_URI);
  return mongoose.connection;
};