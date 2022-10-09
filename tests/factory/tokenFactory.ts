import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../src/app";
async function createToken() {
  const userData = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(15),
    photo: faker.internet.avatar(),
  };
  const { email, password } = userData;
  await supertest(app).post("/signup").send(userData);
  const response = await supertest(app)
    .post("/signin")
    .send({ email, password });
  return response.body.token;
}

export default createToken;
