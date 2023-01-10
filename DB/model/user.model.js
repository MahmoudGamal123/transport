import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    // strict: true,
  // strictQuery: true,
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    coverPics: Array,
    gender: { type: String, enum: ["male", "female"], default: "male" },
    confirmEmail: { type: Boolean, default: false },
    code: String,
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true
  }
);

export const userModel = model("User", userSchema);
