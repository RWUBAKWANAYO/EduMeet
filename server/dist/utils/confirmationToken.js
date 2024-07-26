"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashToken = exports.generateToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateToken = function () {
    return crypto_1.default.randomBytes(20).toString("hex");
};
exports.generateToken = generateToken;
const hashToken = function (token) {
    return crypto_1.default.createHash("sha256").update(token).digest("hex");
};
exports.hashToken = hashToken;
