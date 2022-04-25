import bcrypt from "bcryptjs/dist/bcrypt.js";
import { generateAuthToken } from "../utils/genToken.js";
import AppError from "../utils/appErrors.js";
import msg from "../common/errorMessage.js";
import { Lottery } from "../models/lottery.js";
import { ObjectID } from "bson";

export const adminLogin = async (admin, password) => {
  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) {
    throw new AppError(msg.INCORRECT_PASSWORD, msg.BAD_REQUEST_CODE);
  }
  const token = generateAuthToken(admin);
  return { admin, token };
};

export const getUsersByLotteryId = async (lotteryID) => {
  // const users = await Lottery.findOne({ _id: lotteryID }, { buyers: 1, _id: 0 })
  //   .populate({ path: "buyers", select: "email -_id" })
  //   .exec();
  const users = await Lottery.aggregate([
    {
      $match: {
        _id: new ObjectID(lotteryID),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "buyers",
        foreignField: "_id",
        as: "users",
      },
    },
    {
      $unwind: {
        path: "$users",
      },
    },
    {
      $group: {
        _id: "$_id",
        users: {
          $push: "$users.email",
        },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);
  // console.log(users);
  // console.log(users[0]);
  return users[0];
};
