import { v2 as cloudinary } from "cloudinary";
import { ErrorFormat } from "../utils";
import { NextFunction } from "express";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFile = async (
  file: string,
  folder: string,
  next: NextFunction
): Promise<string | undefined> => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: `NayoMeet/${folder === "profile" ? "profile" : "messages"}`,
    });
    if (!result) {
      next(new ErrorFormat("Error uploading image", 500));
      return;
    }
    return result.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    next(new ErrorFormat("Error uploading image", 500));
  }
};
