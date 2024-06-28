"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../middlewares");
const auth_controller_1 = require("../controllers/auth.controller");
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
authRouter.route("/signup").post(middlewares_1.multerConfig, auth_controller_1.signup);
authRouter.route("/login").post(auth_controller_1.login);
exports.default = authRouter;
