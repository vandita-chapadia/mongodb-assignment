import { Router } from "express";
import userController from "../controller/userController.js";
import { userAuth } from "../middleware/userAuth.js";

const router = Router();

router.post("/", userController.createUserController);
router.post("/login", userController.userLoginCtrl);
router.post("/purchase", userAuth, userController.purchaseLotteryCtrl);

export default router;
