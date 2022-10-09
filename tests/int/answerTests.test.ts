import app from "../../src/app";
import supertest from "supertest";
import createToken from "../factory/tokenFactory";
import questionFactory from "../factory/int/questionFactory";
import answerFactory from "../factory/int/answerFactory";
import prisma from "../../src/database/dabatase";

const server = supertest(app);
beforeEach(async () => {
  await prisma.$executeRaw`
  TRUNCATE TABLE question RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`
  TRUNCATE TABLE users RESTART IDENTITY CASCADE;
`;
  await prisma.$executeRaw`
TRUNCATE TABLE answer RESTART IDENTITY CASCADE;
`;
});
describe("Insert Answer Test POST /answer", () => {
  it("Insert Answer Sucessfuly, Expect 200", async () => {
    const token = await createToken();
    await questionFactory.createQuestion(token);
    const answer = answerFactory.allowAnswer();
    const result = await server
      .post("/answer")
      .send(answer)
      .set("Authorization", `Bearer ${token}`);
    const answerInserted = await prisma.answer.findMany();
    expect(result.status).toBe(201);
    expect(answerInserted.length).toBe(1);
  });
  it("Insert Duplicate Answer, Expect 409", async () => {
    const token = await createToken();
    await questionFactory.createQuestion(token);
    const answer = answerFactory.allowAnswer();
    await server
      .post("/answer")
      .send(answer)
      .set("Authorization", `Bearer ${token}`);
    const result = await server
      .post("/answer")
      .send(answer)
      .set("Authorization", `Bearer ${token}`);
    const answerInserted = await prisma.answer.findMany();
    expect(result.status).toBe(409);
    expect(answerInserted.length).toBe(1);
  });
  it("Insert Answer in Non Existent Question, Expect 404 ", async () => {
    const token = await createToken();
    const answer = answerFactory.allowAnswer();

    const result = await server
      .post("/answer")
      .send(answer)
      .set("Authorization", `Bearer ${token}`);
    const answerInserted = await prisma.answer.findMany();

    expect(result.status).toBe(404);
    expect(answerInserted.length).toBe(0);
  });
  it("Insert Answer Sending No Token, Expect 401", async () => {
    const token = await createToken();
    const answer = answerFactory.allowAnswer();
    await questionFactory.createQuestion(token);

    const result = await server.post("/answer").send(answer);
    const answerInserted = await prisma.answer.findMany();

    expect(result.status).toBe(401);
    expect(answerInserted.length).toBe(0);
  });
  it("Insert Answer Sending No data, Expect 422", async () => {
    const token = await createToken();
    const answer = {};
    await questionFactory.createQuestion(token);

    const result = await server
      .post("/answer")
      .send(answer)
      .set("Authorization", `Bearer ${token}`);
    const answerInserted = await prisma.answer.findMany();

    expect(result.status).toBe(422);
    expect(answerInserted.length).toBe(0);
  });
});
