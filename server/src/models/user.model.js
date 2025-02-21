import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    retentionCategory: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Low",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
