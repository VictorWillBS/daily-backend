import app from "../../src/app";
import supertest from "supertest";
import prisma from "../../src/database/dabatase";
import commonFactory from "../factory/unit/commonFactory";
import createToken from "../factory/tokenFactory";
import questionFactory from "../factory/int/questionFactory";
import generateDate from "../../src/utils/generateDate";
beforeEach(async () => {
  await prisma.$executeRaw`
  TRUNCATE TABLE question RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`
  TRUNCATE TABLE users RESTART IDENTITY CASCADE;
`;
});

afterAll(() => {
  prisma.$disconnect;
});

const server = supertest(app);

describe("Create Question POST /question/create", () => {
  it("Create Question Sucessful, Expect 201", async () => {
    const token = await createToken();
    const question = { question: commonFactory.randomString() };
    const result = await server
      .post("/question/create")
      .send(question)
      .set("Authorization", `Bearer ${token}`);
    const questionCreated = await prisma.questions.findFirst({
      where: { question: question.question },
    });
    expect(result.status).toBe(201);
    expect(result.body).toEqual({ ...question, id: 1 });
    expect(questionCreated).not.toBeNull();
  });

  it("Create Duplicade Question,Expect 409", async () => {
    const token = await createToken();
    const question = { question: commonFactory.randomString() };
    await server
      .post("/question/create")
      .send(question)
      .set("Authorization", `Bearer ${token}`);
    const result = await server
      .post("/question/create")
      .send(question)
      .set("Authorization", `Bearer ${token}`);
    const questionCreated = await prisma.questions.findMany({
      where: { question: question.question },
    });

    expect(result.status).toBe(409);
    expect(questionCreated.length).toEqual(1);
  });
  it("Create More Than Five Question, Expect 400", async () => {
    const token = await createToken();
    let result;
    for (let i = 0; i <= 6; i++) {
      const question = { question: commonFactory.randomString() };
      result = await server
        .post("/question/create")
        .send(question)
        .set("Authorization", `Bearer ${token}`);
    }
    const questionsCreated = await prisma.questions.findMany({
      where: { userId: 1 },
    });
    expect(result?.status).toBe(400);
    expect(questionsCreated.length).toBe(5);
  });
  it("Create Question No Sending Data, Expect 422", async () => {
    const token = await createToken();
    const question = { question: "" };
    const result = await server
      .post("/question/create")
      .send(question)
      .set("Authorization", `Bearer ${token}`);
    const questionsCreated = await prisma.questions.findMany();
    expect(result.status).toBe(422);
    expect(questionsCreated.length).toBe(0);
  });
  it("Create Question No Senfing Token, Expect 401", async () => {
    const token = await createToken();
    const question = { question: commonFactory.randomString() };
    const result = await await server.post("/question/create").send(question);
    const questionsCreated = await prisma.questions.findMany();
    expect(result.status).toBe(401);
    expect(questionsCreated.length).toBe(0);
  });
});

describe("Get Questions GET /questions", () => {
  it("Get question Sucessfull, Expect 200", async () => {
    const token = await createToken();
    for (let i = 0; i < 3; i++) {
      const question = { question: commonFactory.randomString() };
      await server
        .post("/question/create")
        .send(question)
        .set("Authorization", `Bearer ${token}`);
    }
    const result = await server
      .get("/questions")
      .send()
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(200);
    expect(result.body.length).toBe(3);
  });
  it("Get Questions With DB Empty, Expect 200 and []", async () => {
    const token = await createToken();
    const result = await server
      .get("/questions")
      .send()
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(200);
    expect(result.body).toStrictEqual([]);
  });
  it("Get Question No Sending Token, Expect 401", async () => {
    const token = await createToken();
    for (let i = 0; i < 3; i++) {
      const question = { question: commonFactory.randomString() };
      await server
        .post("/question/create")
        .send(question)
        .set("Authorization", `Bearer ${token}`);
    }
    const result = await server.get("/questions").send();
    expect(result.status).toBe(401);
    expect(result.body.length).toBeFalsy;
  });
});

describe("Delete Question DELETE /questions/:id", () => {
  it("Delete Question Sucessfull, Expect 200", async () => {
    const token = await createToken();
    const question = await questionFactory.createQuestion(token);
    const result = await server
      .delete(`/questions/${question.id}`)
      .send()
      .set("Authorization", `Bearer ${token}`);
    const allQuestions = await prisma.questions.findMany({
      where: { isAble: true },
    });
    expect(result.status).toBe(200);
    expect(allQuestions.length).toBeFalsy();
  });
  it("Try Delete non Existent Question, Expect 404", async () => {
    const token = await createToken();
    await questionFactory.createQuestion(token);
    const result = await server
      .delete(`/questions/999999`)
      .send()
      .set("Authorization", `Bearer ${token}`);
    const allQuestions = await prisma.questions.findMany({
      where: { isAble: true },
    });
    expect(result.status).toBe(404);
    expect(allQuestions.length).toBe(1);
  });
  it("Try Delete Question Sending no Token, 401", async () => {
    const token = await createToken();
    const question = await questionFactory.createQuestion(token);
    const result = await server.delete(`/questions/${question.id}`).send();
    const allQuestions = await prisma.questions.findMany({
      where: { isAble: true },
    });
    expect(result.status).toBe(401);
    expect(allQuestions.length).toBe(1);
  });
});

describe("Get Question by Date GET /questions/:date", () => {
  it("Get Sucessfuly Question,Expect 200", async () => {
    const token = await createToken();
    const question = await questionFactory.createQuestion(token);
    const today = generateDate(new Date());
    const result = await server
      .get(`/questions/${today}`)
      .send()
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(200);
    expect(result.body.length).toBe(1);
  });
  it("Try Get Question Sending No token,Expect 401", async () => {
    const token = await createToken();
    await questionFactory.createQuestion(token);
    const today = generateDate(new Date());
    const result = await server.get(`/questions/${today}`).send();
    expect(result.status).toBe(401);
  });
});
