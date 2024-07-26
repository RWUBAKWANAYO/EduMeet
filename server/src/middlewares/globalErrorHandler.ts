import { NextFunction, Request, Response } from "express";
import { ErrorFormat } from "../utils";

export const globalErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const developmentError = (res: Response, error: any) => {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      stack: error.stack,
      error,
    });
  };

  const productionError = (res: Response, error: any) => {
    if (error.isOperational) {
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Something went wrong, please try again later.",
      });
    }
  };

  const castErrorHandler = (error: any) => {
    const message = `Invalid ${error.path}: ${error.value}`;
    return new ErrorFormat(message, 400);
  };

  const duplicateKeyHandler = (error: any) => {
    const key = Object.keys(error.keyValue || {}).join(", ") || "field";
    const value = Object.values(error.keyValue || {}).join(", ") || "unknown";
    const message = `The value '${value}' for '${key}' already exists. Please use another ${key}!`;
    return new ErrorFormat(message, 400);
  };

  const validationErrorHandler = (error: any) => {
    const errorArray = Object.values(error.errors).map((err: any) => err.message);
    const message = `Invalid data: ${errorArray.join(". ")}`;
    return new ErrorFormat(message, 400);
  };

  const jwtErrorHandler = () => {
    return new ErrorFormat("Invalid token. Please login again!", 401);
  };
  const tokenExpireErrorHandler = () => {
    return new ErrorFormat("Token expire. Please login again!", 401);
  };

  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    return developmentError(res, error);
  } else if (process.env.NODE_ENV === "production") {
    if (process.env.NODE_ENV === "production") {
      if (error.name === "CastError") error = castErrorHandler(error);
      if (error.code === 11000) error = duplicateKeyHandler(error);
      if (error.name === "ValidationError") error = validationErrorHandler(error);
      if (error.name === "JsonWebTokenError") error = jwtErrorHandler();
      if (error.name === "TokenExpiredError") error = tokenExpireErrorHandler();
      return productionError(res, error);
    }
  }
};
