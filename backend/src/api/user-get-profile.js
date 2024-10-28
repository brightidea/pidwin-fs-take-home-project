import jwt from "jsonwebtoken";
import User from "../models/user.js";

const getProfile = async (req, res) => {
    try {
        const authToken = req.headers.authorization.split(" ")[1];
        const decodedData = jwt.verify(authToken, "test");
        const { email, password } = decodedData;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User Does Not Exist" });
        }

        const isPasswordCorrect = password === existingUser.password;

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        const token = jwt.sign(
            {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                password: existingUser.password,
                tokens: existingUser.tokens,
            },
            "test",
            { expiresIn: "1h" }
        );

        res.status(200).json({
            token,
            userData: {
                name: existingUser.name,
                email: existingUser.email,
                exp: new Date() + 60 * 60 * 1000,
                tokens: existingUser.tokens,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export default getProfile;
