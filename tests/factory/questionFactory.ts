import { faker } from "@faker-js/faker";

function allowQuestion() {
  return {
    id: faker.datatype.number(),
    question: faker.name.firstName(),
    userId: faker.datatype.number(),
    isAble: faker.datatype.boolean(),
    date: faker.datatype.datetime(),
  };
}

export default { allowQuestion };
