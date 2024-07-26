import { NextFunction, Response, Request } from "express";
import { FuncType } from "../types/errorHandler.type";

export const asyncErrorHandler = (func: FuncType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((error: any) => next(error));
  };
};
