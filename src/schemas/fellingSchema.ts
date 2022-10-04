import joi from "joi";
const re = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const fellingSchema = joi.object({
  felling: joi.string().valid().allow("Triste", "Feliz", "Neutro").required(),
  day: joi.string().regex(re).required(),
});

export default fellingSchema;
