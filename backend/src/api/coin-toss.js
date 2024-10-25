import express from "express";
import flip from "./coin-toss-flip.js";
import auth from "../utils/auth.js";

const router = express.Router();

router.post("/flip", auth, flip);

export default router;
