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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const utils_1 = require("../utils");
const cloudinary_1 = require("../services/cloudinary");
exports.signup = (0, utils_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const _b = req.body, { file, photo } = _b, rest = __rest(_b, ["file", "photo"]);
    const user = yield user_model_1.default.create(rest);
    if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) {
        const url = yield (0, cloudinary_1.uploadFile)(req.file.path, "profile", next);
        if (url) {
            user.photo = url;
            yield user.save();
        }
    }
    return (0, utils_1.responseFormat)(user, 201, res);
}));
exports.login = (0, utils_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new utils_1.ErrorFormat("Please provide email and password", 400));
    }
    const user = yield user_model_1.default.findOne({ email }).select("+password");
    if (!user || !(yield user.comparePassword(password, user.password))) {
        return next(new utils_1.ErrorFormat("Incorrect email or password", 401));
    }
    return (0, utils_1.responseFormat)(user, 200, res);
}));
