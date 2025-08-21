import mongoose from "mongoose";

const emailVerificationSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  token: { type: String, required: true },
  credentials: {
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
  },
  expiresAt: { type: Date, required: true },
});

// Auto-delete expired verification entries
emailVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const EmailVerification = mongoose.model(
  "EmailVerification",
  emailVerificationSchema
);
