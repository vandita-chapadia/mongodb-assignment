import Joi from "joi";
export const UserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  age: Joi.number().positive().integer(),
});
