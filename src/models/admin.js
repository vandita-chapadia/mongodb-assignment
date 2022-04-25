import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
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
  role: {
    type: String,
    required: true,
    default: "admin",
  },
});

AdminSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

export const Admin = mongoose.model("admin", AdminSchema);
