import mongoose,{Schema} from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["new-item", "claim-approved", "claim-rejected", "status-update"],
    },
    message: String,
    read: { type: Boolean, default: false }, // track which notifications user has seen
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification",notificationSchema)
