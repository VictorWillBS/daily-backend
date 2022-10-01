import joi from "joi";
const re = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/;
const signUpSchema = joi.object({
  name: joi.string().required().messages({
    "string.base": `"name" should be a type of 'text'`,
    "any.required": `"name" is a required field`,
  }),
  email: joi.string().email().required().messages({
    "string.base": `"email" should be a type of 'email'`,
    "any.required": `"email" is a required field`,
  }),
  password: joi.string().min(10).max(30).required().messages({
    "string.base": `"password" should be a type of 'text'`,
    "string.min": `"password" should have a minimum length of 10 characters`,
    "string.max": `"password" should have a maximum length of 30 characters`,
    "any.required": `"password" is a required field`,
  }),
  photo: joi.string().empty("").regex(re).rule({
    message: `"photo" should be a link of a Image (format allowed: png,gif,webp,jpeg,jpg.)`,
  }),
});

export default signUpSchema;
