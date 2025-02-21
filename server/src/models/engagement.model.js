import mongoose from "mongoose";

const engagementSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    logins: { type: Number, default: 0 },
    featureUsage: { type: Number, default: 0 },
    timeSpent: { type: Number, default: 0 },
    profileUpdates: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Engagement = mongoose.model("Engagement", engagementSchema);
