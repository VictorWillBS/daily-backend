import supertest from "supertest";
import app from "../../../src/app";
import commonFactory from "../unit/commonFactory";

const server = supertest(app);
async function createQuestion(token: string) {
  const question = { question: commonFactory.randomString() };
  const { body } = await server
    .post("/question/create")
    .send(question)
    .set("Authorization", `Bearer ${token}`);
  return body;
}

export default { createQuestion };
