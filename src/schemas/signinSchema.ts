import joi from "joi";
const signInSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().min(10).max(30).required(),
});

export default signInSchema;
