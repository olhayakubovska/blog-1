import mongoose from "mongoose";
import { USER_ROLE } from "../constants.js";

const userSchema = mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: USER_ROLE.USER,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
