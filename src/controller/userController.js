import userService from "../services/userService.js";
import { UserSchema } from "../validators/userValidation.js";
import AppError from "../utils/appErrors.js";
import { User } from "../models/user.js";
import { Lottery } from "../models/lottery.js";
import { Credentials } from "../validators/credentialValidation.js";
import msg from "../common/errorMessage.js";

export default class UserController {
  static createUserController = async (req, res, next) => {
    try {
      const result = UserSchema.validate(req.body);
      if (result.error) {
        throw new AppError(result.error, msg.BAD_REQUEST_CODE);
      }
      const output = await userService.createUser(req.body);
      res.status(msg.CREATED_CODE).send(output);
    } catch (e) {
      next(e);
    }
  };

  static userLoginCtrl = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = Credentials.validate({ email, password });
      if (result.error) {
        throw new AppError(result.error, msg.BAD_REQ_CODE);
      }
      const user = await User.findOne({ email });
      if (!user) {
        throw new AppError(msg.USER_NOT_FOUND, msg.NOT_FOUND_CODE);
      }
      const output = await userService.userLogin(user, password);
      res.status(msg.OK_CODE).send(output);
    } catch (e) {
      next(e);
    }
  };

  static purchaseLotteryCtrl = async (req, res, next) => {
    try {
      const { lotteryID } = req.body;

      const lottery = await Lottery.findById(lotteryID);
      // check if lottery is valid or not
      if (!lottery) {
        throw new AppError(msg.LOTTERY_NOT_FOUND, msg.NOT_FOUND_CODE);
      }

      const output = await userService.purchaseLottery(req.user, lottery);
      res.status(msg.OK_CODE).send(output);
    } catch (e) {
      next(e);
    }
  };
}
