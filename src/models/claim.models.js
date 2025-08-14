import mongoose,{Schema} from "mongoose";

const claimSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true  
    },
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: String, // Proof or notes
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    }
}, { timestamps: true });

 export const Claim = mongoose.model("Claim", claimSchema);
