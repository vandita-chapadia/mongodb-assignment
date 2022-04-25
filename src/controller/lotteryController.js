import lotteryService from "../services/lotteryService.js";
import { LotterySchema } from "../validators/lotteryValidation.js";
import AppError from "../utils/appErrors.js";
import msg from "../common/errorMessage.js";

export default class LotteryCtrl {
  static createLotteryCtrl = async (req, res, next) => {
    try {
      const result = LotterySchema.validate(req.body);
      if (result.error) {
        throw new AppError(result.error, msg.BAD_REQUEST_CODE);
      }
      const output = await lotteryService.createLottery(req.body);
      res.status(msg.OK_CODE).send(output);
    } catch (e) {
      next(e);
    }
  };
}
