import mongoose from "mongoose";
import bcrypt from "bcryptjs/dist/bcrypt.js";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      default: 0,
    },
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

export const User = mongoose.model("User", UserSchema);
