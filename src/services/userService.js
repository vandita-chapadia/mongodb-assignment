import { User } from "../models/user.js";
import AppError from "../utils/appErrors.js";
import { generateAuthToken } from "../utils/genToken.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import msg from "../common/errorMessage.js";
import { isPurchaseValid } from "../utils/purchaseValid.js";
import { purchaseConfirm, sendWelcome } from "../utils/email.js";

export default class UserService {
  // create a new user
  static createUser = async (newUser) => {
    const isValid = await User.findOne({ email: newUser.email });
    if (isValid) {
      throw new AppError(msg.EMAIL_ALREADY_EXIST, msg.BAD_REQ_CODE);
    }
    const user = await new User(newUser).save();
    sendWelcome(user.email, user.name);
    const token = generateAuthToken(user);
    return { user, token };
  };

  // user login
  static userLogin = async (user, password) => {
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new AppError(msg.INCORRECT_PASSWORD, msg.BAD_REQ_CODE);
    }
    const token = generateAuthToken(user);
    return { user, token };
  };

  // purchase lottery
  static purchaseLottery = async (user, lottery) => {
    const { buyers } = lottery;
    const { _id } = user;
    const isValid = isPurchaseValid(lottery);
    // check weather user has already purchased it or not
    if (isValid) {
      if (buyers.includes(_id)) {
        throw new AppError(msg.ALREADY_PURCHASED, msg.BAD_REQ_CODE);
      } else {
        buyers.push(_id);
        await lottery.save();
        purchaseConfirm(user, lottery);

        return { success: msg.PURCHASED_SUCCESSFULLY };
      }
    }
  };
}
