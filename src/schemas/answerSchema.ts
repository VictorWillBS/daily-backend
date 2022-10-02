import joi from "joi";
const answerSchema = joi.object({
  answer: joi.string().required(),
  questionId: joi.number().required(),
});

export default answerSchema;
