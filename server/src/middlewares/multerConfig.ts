import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

const fileFilter = (_req: Request, _file: Express.Multer.File, cb: FileFilterCallback) => {
  cb(null, true);
};

const storage = multer.diskStorage({});

export const multerConfig = multer({
  storage,
  fileFilter,
}).single("file");
