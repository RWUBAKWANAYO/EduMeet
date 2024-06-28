import mongoose from "mongoose";
import { generatePMI } from "../utils";
import validator from "validator";
import bcrypt from "bcryptjs";
import { IUser } from "../types/user.interface";

const userSchema = new mongoose.Schema<IUser>(
  {
    full_name: {
      type: String,
      required: [true, "Please enter your full name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    photo: {
      type: String,
    },
    pmi: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next: any) {
  this.password = await bcrypt.hash(this.password, 12);
  this.pmi = await generatePMI();
  next();
});

userSchema.methods.comparePassword = async function (password: string, dbPassword: string) {
  return await bcrypt.compare(password, dbPassword);
};

const User = mongoose.model("User", userSchema);
export default User;
