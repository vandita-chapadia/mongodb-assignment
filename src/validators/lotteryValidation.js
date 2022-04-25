import Joi from "joi";
export const LotterySchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref("startDate")).required(),
  resultDate: Joi.date().greater(Joi.ref("endDate")).required(),
  purchasePrice: Joi.number().positive().integer().required(),
  winningPrice: Joi.number().min(Joi.ref("purchasePrice")).integer().required(),
  poolSize: Joi.number().integer().positive().required(),
});
