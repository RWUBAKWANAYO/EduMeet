import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { ErrorFormat, asyncErrorHandler, responseFormat } from "../utils";
import { uploadFile } from "../services/cloudinary";

interface CustomRequest extends Request {
  photo?: string;
  file?: Express.Multer.File;
}

export const signup = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const {...rest } = req.body;
    console.log(req.file, 'file...')
    const user = await User.create(rest);
    if (req.file?.path) {
      const url = await uploadFile(req.file.path, "profile", next);
      if (url) {
        user.photo = url;
        await user.save();
      }
    }
    return responseFormat(user, 201, res);
  }
);

export const login = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorFormat("Please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new ErrorFormat("Incorrect email or password", 401));
  }

  return responseFormat(user, 200, res);
});
