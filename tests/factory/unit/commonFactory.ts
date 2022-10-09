import { faker } from "@faker-js/faker";
function randomNumber() {
  return faker.datatype.number();
}
function randomString() {
  return faker.random.alphaNumeric(20);
}
export default {
  randomNumber,
  randomString,
};
