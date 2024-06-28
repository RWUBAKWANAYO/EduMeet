"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseFormat = void 0;
const jwtHandler_1 = require("./jwtHandler");
const responseFormat = (user, statusCode, res) => {
    const token = (0, jwtHandler_1.jwtSignToken)({
        _id: user._id,
        full_name: user.full_name,
        email: user.email,
    });
    user.password = undefined;
    return res.status(statusCode).json({
        status: "success",
        token,
        user,
    });
};
exports.responseFormat = responseFormat;
