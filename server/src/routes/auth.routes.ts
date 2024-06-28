import { multerConfig } from "../middlewares";
import { login, signup } from "../controllers/auth.controller";
import express from "express";

const authRouter = express.Router();

authRouter.route("/signup").post(multerConfig, signup);
authRouter.route("/login").post(login);

export default authRouter;
