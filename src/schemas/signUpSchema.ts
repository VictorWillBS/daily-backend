import joi from "joi";
const re = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/;
const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().min(10).max(30).required(),
  photo: joi.string().regex(re),
});

export default signUpSchema;
