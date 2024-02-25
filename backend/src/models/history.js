import mongoose from "mongoose";

const historySchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answer: { type: String, enum: ['HEAD', 'TRAIL'], required: true },
    result: { type: Boolean, required: true },
    amount: { type: Number, required: true },
    payout: { type: Number, required: true }
});

export default mongoose.model("History", historySchema);