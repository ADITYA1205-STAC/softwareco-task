const express = require('express');
const helmet = require('helmet');
const compress = require('compression');
const cors = require('cors');
const passport = require('passport');

const { errorConverter, errorHandler } = require('../middleware/error');
const router = require('../api/routes');
const { Jwt } = require('./passport');

const app = express();

// Use Json
app.use(express.json());

// Gzip Compression
app.use(compress());

// Secure apps by setting various HTTP headers
app.use(helmet());

// Enable CORS - Cross Origin Resource Sharing
app.use(cors({ maxAge: 7200 }));

// Enable authentication
app.use(passport.initialize());
passport.use('jwt', Jwt);

// Route registration
app.use('/api', router);

// Convert Error
app.use(errorConverter);

// Handle Error
app.use(errorHandler);

module.exports = app;

