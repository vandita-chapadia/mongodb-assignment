import jwt from "jsonwebtoken";
import msg from "../common/errorMessage.js";
import { User } from "../models/user.js";
import AppError from "../utils/appErrors.js";

export const userAuth = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      throw new AppError(msg.AUTH_ERR, msg.UNAUTHORIZED_CODE);
    }
    const token = req.headers["authorization"].replace("Bearer ", "");
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decode._id });
    if (!user) {
      throw new AppError(msg.USER_NOT_FOUND, msg.NOT_FOUND_CODE);
    }
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};
