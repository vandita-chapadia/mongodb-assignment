import msg from "../common/errorMessage.js";
import AppError from "./appErrors.js";

export const isPurchaseValid = (lottery) => {
  const currentDate = new Date();
  const { startDate, endDate, poolSize, buyers } = lottery;

  if (startDate > currentDate) {
    // Early for lottery
    throw new AppError(msg.LOTTERY_IS_NOT_STARTED, msg.BAD_REQ_CODE);
  } else if (endDate <= currentDate) {
    // Late for lottery
    throw new AppError(msg.PURCHASE_TIME_EXPIRED, msg.BAD_REQ_CODE);
  } else {
    // lottery is full
    if (poolSize <= buyers.length) {
      throw new AppError(msg.LOTTERY_IS_FULL, msg.BAD_REQ_CODE);
    }
    // ok
    return msg.SUCCESS;
  }
};
