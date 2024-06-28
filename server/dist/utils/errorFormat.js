"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorFormat = void 0;
class ErrorFormat extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = this.statusCode >= 400 && this.statusCode < 500 ? "fail" : "error";
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ErrorFormat = ErrorFormat;
