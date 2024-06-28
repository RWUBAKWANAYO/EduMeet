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
exports.getUsersWithInvitationStatus = exports.getUser = exports.getUsers = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const utils_1 = require("../utils");
const mongoose_1 = __importDefault(require("mongoose"));
exports.getUsers = (0, utils_1.asyncErrorHandler)((_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find().select("-pmi");
    return res.status(200).json({ status: "success", count: users.length, data: users });
}));
exports.getUser = (0, utils_1.asyncErrorHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(req.params.id);
    if (!user) {
        return next(new Error(`User with id ${req.params.id} not found`));
    }
    return res.status(200).json({ status: "success", data: user });
}));
exports.getUsersWithInvitationStatus = (0, utils_1.asyncErrorHandler)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { meetingId } = req.params;
    const senderId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) || "";
    const users = yield user_model_1.default.aggregate([
        {
            $lookup: {
                from: "invitations",
                let: { email: "$email" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$receiver_email", "$$email"] },
                                    { $eq: ["$sender_id", senderId] },
                                    { $eq: ["$meeting_id", new mongoose_1.default.Types.ObjectId(meetingId)] },
                                ],
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            status: 1,
                        },
                    },
                ],
                as: "invitations",
            },
        },
        {
            $addFields: {
                status: {
                    $cond: {
                        if: { $gt: [{ $size: { $ifNull: ["$invitations", []] } }, 0] },
                        then: { $arrayElemAt: ["$invitations.status", 0] },
                        else: null,
                    },
                },
            },
        },
        {
            $project: {
                full_name: 1,
                email: 1,
                photo: 1,
                status: 1,
            },
        },
    ]);
    return res.status(200).json({
        status: "success",
        count: users.length,
        data: users,
    });
}));
