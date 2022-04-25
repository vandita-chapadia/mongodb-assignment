import { Lottery } from "../models/lottery.js";
export default class LotteryService {
  static createLottery = async (lottery) => {
    return await new Lottery(lottery).save();
  };
}
