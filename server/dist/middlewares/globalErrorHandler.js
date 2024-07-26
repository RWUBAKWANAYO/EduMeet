"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const utils_1 = require("../utils");
const globalErrorHandler = (error, _req, res, _next) => {
    const developmentError = (res, error) => {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
            stack: error.stack,
            error,
        });
    };
    const productionError = (res, error) => {
        if (error.isOperational) {
            res.status(error.statusCode).json({
                status: error.status,
                message: error.message,
            });
        }
        else {
            res.status(500).json({
                status: "error",
                message: "Something went wrong, please try again later.",
            });
        }
    };
    const castErrorHandler = (error) => {
        const message = `Invalid ${error.path}: ${error.value}`;
        return new utils_1.ErrorFormat(message, 400);
    };
    const duplicateKeyHandler = (error) => {
        const key = Object.keys(error.keyValue || {}).join(", ") || "field";
        const value = Object.values(error.keyValue || {}).join(", ") || "unknown";
        const message = `The value '${value}' for '${key}' already exists. Please use another ${key}!`;
        return new utils_1.ErrorFormat(message, 400);
    };
    const validationErrorHandler = (error) => {
        const errorArray = Object.values(error.errors).map((err) => err.message);
        const message = `Invalid data: ${errorArray.join(". ")}`;
        return new utils_1.ErrorFormat(message, 400);
    };
    const jwtErrorHandler = () => {
        return new utils_1.ErrorFormat("Invalid token. Please login again!", 401);
    };
    const tokenExpireErrorHandler = () => {
        return new utils_1.ErrorFormat("Token expire. Please login again!", 401);
    };
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    if (process.env.NODE_ENV === "development") {
        return developmentError(res, error);
    }
    else if (process.env.NODE_ENV === "production") {
        if (process.env.NODE_ENV === "production") {
            if (error.name === "CastError")
                error = castErrorHandler(error);
            if (error.code === 11000)
                error = duplicateKeyHandler(error);
            if (error.name === "ValidationError")
                error = validationErrorHandler(error);
            if (error.name === "JsonWebTokenError")
                error = jwtErrorHandler();
            if (error.name === "TokenExpiredError")
                error = tokenExpireErrorHandler();
            return productionError(res, error);
        }
    }
};
exports.globalErrorHandler = globalErrorHandler;
