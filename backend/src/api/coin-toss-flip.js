import User from "../models/user.js";
import CoinToss from "../models/coin-toss.js";
import jwt from "jsonwebtoken";
import { tossCoin } from "../utils/coin-toss.js";

const flip = async (req, res) => {
    try {
        const { wager, coinSide } = req.body;
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const user = jwt.verify(token, "test");
        const { email } = user;

        const existingUser = await User.findOne({ email }).select("tokens");

        if (!existingUser) {
            return res.status(404).json({ message: "User Does Not Exist" });
        }

        if (wager > existingUser.tokens) {
            return res.status(400).json({ message: "Insufficient Funds" });
        }

        const userId = existingUser._id;
        const { isWin, resultSide, winnings, winStreak, bonusLevel } =
            await tossCoin(userId, wager, coinSide);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $inc: { tokens: -wager + winnings } },
            { new: true, select: "tokens" }
        );

        const tossHistory = await CoinToss.find({ user_id: userId })
            .sort("-date") // Use shorthand notation for descending sort
            .limit(10);

        res.status(200).json({
            bonusLevel,
            result: isWin ? "win" : "lose",
            resultSide: resultSide,
            winnings: isWin ? winnings : -wager,
            winStreak,
            tokens: updatedUser.tokens,
            tossHistory,
        });
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(403).json({ message: "Unauthenticated" });
        }
        res.status(500).json({ message: "Something went wrong" });
    }
};

export default flip;
