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
exports.generatePMI = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const generatePMI = () => __awaiter(void 0, void 0, void 0, function* () {
    let pmi = 1000000;
    let isUnique = false;
    while (!isUnique) {
        pmi = Math.floor(1000000 + Math.random() * 9000000);
        const existingUser = yield user_model_1.default.findOne({ pmi });
        if (!existingUser) {
            isUnique = true;
        }
    }
    return pmi;
});
exports.generatePMI = generatePMI;
