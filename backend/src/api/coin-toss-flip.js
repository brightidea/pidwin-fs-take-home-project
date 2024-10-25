import User from "../models/user.js";
import jwt from "jsonwebtoken";

const flip = async (req, res) => {
  const { wager, coinSide } = req.body;

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = jwt.verify(token, "test");

    const { email } = user;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist" });
    }

    if (wager > existingUser.tokens) {
      return res.status(400).json({ message: "Insufficient Funds" });
    }

    // Deduct the wager from user's tokens before the coin toss
    await User.findByIdAndUpdate(existingUser._id, {
      tokens: existingUser.tokens - wager,
    });

    // Determine if the user wins based on the coin side
    const coinFlipResult = Math.random() < 0.5 ? "Heads" : "Tails";
    const isWin = coinFlipResult === coinSide;
    const winnings = isWin ? wager * 2 : 0; // Double the wager for a win

    // Update the user's tokens with winnings if they win
    const updatedUser = await User.findByIdAndUpdate(
      existingUser._id,
      { $inc: { tokens: winnings } },
      { new: true }
    );

    res.status(200).json({
      result: isWin ? "Win" : "Lose",
      resultSide: coinFlipResult,
      winnings: isWin ? wager : -wager,
      tokens: updatedUser.tokens,
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Unauthenticated" });
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default flip;
