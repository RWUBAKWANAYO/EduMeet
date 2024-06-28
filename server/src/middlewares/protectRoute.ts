import User from "../models/user.model";
import { ErrorFormat, asyncErrorHandler, jwtVerifyToken } from "../utils";
import { Request, Response, NextFunction } from "express";

export const protectRoute = asyncErrorHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) token = token.split(" ")[1];
    if (!token) return next(new ErrorFormat("Please login to access this route", 401));

    const decodedToken = await jwtVerifyToken(token);

    const user = await User.findById(decodedToken._id);

    if (!user) return next(new ErrorFormat("User not found", 404));

    req.user = user;
    next();
  }
);
