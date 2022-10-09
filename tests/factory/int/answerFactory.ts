import { faker } from "@faker-js/faker";

function allowAnswer() {
  return { answer: faker.name.fullName(), questionId: 1 };
}

export default { allowAnswer };
