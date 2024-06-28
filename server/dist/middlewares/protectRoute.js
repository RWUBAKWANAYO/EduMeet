"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const utils_1 = require("../utils");
exports.protectRoute = (0, utils_1.asyncErrorHandler)((req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer"))
        token = token.split(" ")[1];
    if (!token)
        return next(new utils_1.ErrorFormat("Please login to access this route", 401));
    const decodedToken = yield (0, utils_1.jwtVerifyToken)(token);
    const user = yield user_model_1.default.findById(decodedToken._id);
    if (!user)
        return next(new utils_1.ErrorFormat("User not found", 404));
    req.user = user;
    next();
}));
