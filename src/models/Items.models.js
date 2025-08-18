import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  category: {
    type: String,
    enum: ["electronics", "documents", "clothing", "accessories", "others"],
    default: "others"
  },
  type: {
    type: String,
    enum: ["Found", "Lost"], // match middleware
    required: true
  },
  dateFound: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true, // new required field
    trim: true
  },
  images: {
    type: [String], // multiple uploaded images
    required: true
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Available", "Claimed", "Returned"], // match middleware
    default: "Available"
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

export const Item = mongoose.model("Item", itemSchema);
