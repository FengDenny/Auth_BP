const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = require('./app');
const path = require('path');
const fs = require('fs');
const https = require('https');

//  For localhost https certificate verification access (development only)
const certOptions = {
  key: fs.readFileSync(path.resolve('./config/server.key')),
  cert: fs.readFileSync(path.resolve('./config/server.crt')),
};

// uncaught exception
process.on('uncaughtException', (err) => {
  console.log('UNHANDLED EXCEPTION');
  console.log(err.name, err.message);
  process.exit(1);
});

// Load config
dotenv.config({
  path: './config/config.env',
});

// replacing PASSWORD string with config DATABASE_PASSWORD
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Connect to DB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected!'));
mongoose.set('useFindAndModify', false);
//  Port number declaration in config or 3000

const port = process.env.PORT || 3001;

const server = https.createServer(certOptions, app).listen(port, () => {
  console.log(`App is running on port ${port}`);
});

// Unhandle reject: bad auth for db
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
