import crypto from "crypto";

export const generateToken = function () {
  return crypto.randomBytes(20).toString("hex");
};
export const hashToken = function (token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
};
