import { Response } from "express";
import { jwtSignToken } from "./jwtHandler";

export const responseFormat = (user: any, statusCode: number, res: Response) => {
  const token = jwtSignToken({
    _id: user._id,
    full_name: user.full_name,
    email: user.email,
  });

  user.password = undefined;

  return res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};
