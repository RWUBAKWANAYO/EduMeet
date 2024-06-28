"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../middlewares");
const user_controller_1 = require("../controllers/user.controller");
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
userRouter.route("/").get(middlewares_1.protectRoute, user_controller_1.getUsers);
userRouter.route("/:id").get(user_controller_1.getUser);
userRouter
    .route("/with-invitation-status/:type/:typeId")
    .get(middlewares_1.protectRoute, user_controller_1.getUsersWithInvitationStatus);
exports.default = userRouter;
