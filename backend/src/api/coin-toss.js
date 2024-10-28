import express from "express";
import flip from "./coin-toss-flip.js";
import history from "./coin-toss-history.js";
import auth from "../utils/auth.js";

const router = express.Router();

router.post("/flip", auth, flip);
router.get("/history", auth, history);

export default router;
