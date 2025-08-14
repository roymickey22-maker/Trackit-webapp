import mongoose,{Schema} from "mongoose";
const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    category: {
        type: String,
        enum: ["electronics", "documents", "clothing", "accessories", "others"],
        default: "others"
    },
    type: {
        type: String,
        enum: ["lost", "found"],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    lostImage: String,   // URL to image if item is lost
    foundImage: String,  // URL to image if item is found
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["unclaimed", "claimed", "returned"],
        default: "unclaimed"
    },
    claimedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export const Item = mongoose.model("Item", itemSchema);
