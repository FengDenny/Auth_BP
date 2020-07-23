const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = require("./app")

// uncaught exception
process.on("uncaughtException", (err) => {
    console.log("UNHANDLED EXCEPTION");
    console.log(err.name, err.message);
    process.exit(1);
});

// Load config
dotenv.config({
    path: "./config/config.env",
});

// replacing PASSWORD string with config DATABASE_PASSWORD
const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

// Connect to DB
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected!"));

//  Port number declaration in config or 3000

const port = process.env.PORT || 300;

const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

// Unhandle reject: bad auth for db
process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});