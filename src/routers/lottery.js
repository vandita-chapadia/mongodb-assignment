import { Router } from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import LotteryCtrl from "../controller/lotteryController.js";

const router = Router();

router.post("/", adminAuth, LotteryCtrl.createLotteryCtrl);

export default router;
