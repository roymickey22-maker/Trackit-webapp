import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

// Auto-delete expired OTPs using TTL index
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export const Otp =  mongoose.model("Otp", otpSchema);
