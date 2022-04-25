import msg from "../common/errorMessage.js";
import { Admin } from "../models/admin.js";
import * as adminService from "../services/adminService.js";
import { Credentials } from "../validators/credentialValidation.js";
import AppError from "../utils/appErrors.js";
import { Lottery } from "../models/lottery.js";

export default class AdminController {
  static adminLoginCtrl = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = Credentials.validate({ email, password });
      if (result.error) {
        throw new AppError(result.error, msg.BAD_REQ_CODE);
      }
      const admin = await Admin.findOne({ email });
      if (!admin) {
        throw new AppError(msg.ADMIN_NOT_FOUND, msg.NOT_FOUND_CODE);
      }
      const output = await adminService.adminLogin(admin, password);
      res.status(msg.OK_CODE).send(output);
    } catch (e) {
      next(e);
    }
  };

  static getUsersCtrl = async (req, res, next) => {
    try {
      const { lotteryID } = req.body;
      const lottery = await Lottery.findById(lotteryID);
      // check if lottery is valid or not
      if (!lottery) {
        throw new AppError(msg.LOTTERY_NOT_FOUND, msg.NOT_FOUND_CODE);
      }
      const output = await adminService.getUsersByLotteryId(lottery);
      res.status(msg.OK_CODE).send(output);
    } catch (e) {
      next(e);
    }
  };
}
