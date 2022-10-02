import joi from "joi";
const questionSchema = joi.object({
  question: joi.string().required(),
});

export default questionSchema;
