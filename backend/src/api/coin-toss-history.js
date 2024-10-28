import User from "../models/user.js";
import CoinToss from "../models/coin-toss.js";
import jwt from "jsonwebtoken";

const history = async (req, res) => {
    try {
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
        const userId = existingUser._id;
        const tossHistory = await CoinToss.find({ user_id: userId })
            .sort("-date") // Use shorthand notation for descending sort
            .limit(10);

        res.status(200).json({
            tossHistory,
        });
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(403).json({ message: "Unauthenticated" });
        }
        res.status(500).json({ message: "Something went wrong" });
    }
};

export default history;
