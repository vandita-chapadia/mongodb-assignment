import { Router } from "express";
import adminController from "../controller/adminController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = Router();

router.post("/login", adminController.adminLoginCtrl);
router.get("/usersByLotteryId", adminAuth, adminController.getUsersCtrl);

export default router;
