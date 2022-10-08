import { faker, Faker } from "@faker-js/faker";

function allowAnswer() {
  return {
    answer: faker.lorem.sentence(),
    questionId: faker.datatype.number(),
  };
}

function question() {
  return {
    id: faker.datatype.number(),
    question: faker.lorem.sentence(),
    userId: faker.datatype.number(),
    isAble: faker.datatype.boolean(),
    date: faker.datatype.datetime(),
  };
}

export default {
  allowAnswer,
  question,
};
