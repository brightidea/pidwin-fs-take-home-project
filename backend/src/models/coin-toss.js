import mongoose from "mongoose";

const coinTossSchema = mongoose.Schema({
    id: { type: String },
    date: { type: Date, default: Date.now },
    user_id: { type: String, required: true },
    wager: { type: String, required: true },
    selected_side: { type: String, required: true },
    result_side: { type: String, required: true },
    is_win: { type: String, required: true },
    winnings: { type: Number },
    bonus_level: { type: Number, default: 0 },
});

export default mongoose.model("CoinToss", coinTossSchema);
