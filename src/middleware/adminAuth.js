import jwt from "jsonwebtoken";
import msg from "../common/errorMessage.js";
import { Admin } from "../models/admin.js";
import AppError from "../utils/appErrors.js";

export const adminAuth = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      throw new AppError(msg.AUTH_ERR, msg.UNAUTHORIZED_CODE);
    }
    const token = req.headers["authorization"].replace("Bearer ", "");
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findOne({ _id: decode._id });
    if (!admin) {
      throw new AppError(msg.ADMIN_NOT_FOUND, msg.NOT_FOUND_CODE);
    }
    req.admin = admin;
    next();
  } catch (e) {
    next(e);
  }
};
