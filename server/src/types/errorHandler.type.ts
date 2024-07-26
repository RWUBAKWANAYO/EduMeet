import { NextFunction, Request, Response } from "express";

export type FuncType = (req: Request, res: Response, next: NextFunction) => Promise<any>;
