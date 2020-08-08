const AppError = require("../utils/appError");

// For PRODUCTION ONLY START
const handleInvalidId = (err) => {
    const message = `invalid ${err.path}: ${err.value}. `;
    return new AppError(message, 400);
};

// 1100 error code for UNQIUE fields in userModel
const handleDuplicateFieldsDB = (err) => {
    const value = err.keyValue.email;
    console.log(value);
    const message = `Email \"${value}\" already exists. Please use another email!`;
    return new AppError(message, 400);
};
// For PRODUCTION ONLY END

// JWT errors START
const handleJwtErrorDb = () =>
    new AppError("Invalid token. Please log in again!", 401);

const handleJwtExpiredError = () =>
    new AppError("Your token has expired! Please, log in again", 401);
// JWT error END

// Development Error
// if its in Dev mode, we send back status,error,message,stack to the developer
const sendDevError = (err, req, res) => {
    // A) API
    if (req.originalUrl.startsWith("/api")) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }
    //  B) Rendered Website
    console.log("ERROR!", err);
    return res.status(err.statusCode).render("error", {
        title: "Something went wrong!",
        msg: err.message,
    });
};

// Production Error
// if we ned prod mode, we send back status and message to the client
const sendProdError = (err, req, res) => {
    // A) API
    if (req.originalUrl.startsWith("/api")) {
        // A) Operational, trusted error: send message to client
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
            // B) Programming or other unknown error: don't leak error details
        }
        //  1)Log error
        console.error("ERROR!", err);
        // 2) Send generic message
        return res.status(500).json({
            status: "error",
            message: "Something went wrong!",
        });
    }

    // B) Rendered Website
    // Operational, trusted error: send message to client ?(if) true
    if (err.isOperational) {
        return res.status(err.statusCode).render("error", {
            title: "Something went wrong!",
            msg: err.message,
        });
    }
    // B) Programming or other unknown error: don't leak error details
    //  1)Log error
    console.error("ERROR!", err);
    // 2) Send generic message
    return res.status(err.statusCode).render("error", {
        title: "Something went wrong!",
        msg: "Please try again later.",
    });
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV == "development") {
        sendDevError(err, req, res);
    } else if (process.env.NODE_ENV == "production") {
        let error = {
            ...err,
        };
        error.message = err.message;
        // Invalid Id
        if (error.kind === "ObjectId") error = handleInvalidId(error);
        // duplicate unique fields
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        // invalid JWT token / expired
        if (error.name === "JsonWebTokenError") error = handleJwtErrorDb();
        if (error.name === "TokenExpiredError") error = handleJwtExpiredError();
        sendProdError(error, req, res);
    }
};