const path = require('path');
const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const cors = require('cors');
const UniversalErrorHandler = require('./controller/errorController');

const app = express();

// Body Parser START
app.use(
  express.json({
    limit: '10kb',
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: '10kb',
  })
);
// setting up template engine with express
app.set('view engine', 'pug');
app.set('view', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES

app.use(express.static(__dirname + '/public'));

// GLOBAL MIDDLEWARE
app.use(cors());
// Access-Cross-Allow-Origin *
app.options('*', cors());

// Body Parser END

// Development logging
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/users', userRoutes);

// Handleing unhandled routes
// should be last part of our application
// Build in express method(req.originalUrl)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Universal Error Handler for DB
app.use(UniversalErrorHandler);

module.exports = app;
