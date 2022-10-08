import { faker } from "@faker-js/faker";

function allowUser() {
  return {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    password: faker.random.alphaNumeric(12),
    photo: faker.internet.avatar(),
  };
}

export default {
  allowUser,
};
