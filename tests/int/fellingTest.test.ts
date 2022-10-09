import app from "../../src/app";
import supertest from "supertest";
import prisma from "../../src/database/dabatase";
import createToken from "../factory/tokenFactory";
import fellingFactory from "../factory/int/fellingFactory";
beforeEach(async () => {
  await prisma.$executeRaw`
  TRUNCATE TABLE users RESTART IDENTITY CASCADE;
`;
  await prisma.$executeRaw`
TRUNCATE TABLE fellings RESTART IDENTITY CASCADE;
`;
});

afterAll(() => {
  prisma.$disconnect;
});

const server = supertest(app);

describe("Insert Felling Test POST /felling", () => {
  it("Insert Sucessfuly Felling, Expect 201", async () => {
    const token = await createToken();
    const felling = fellingFactory.allowFelling();
    const result = await server
      .post("/felling")
      .send(felling)
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(201);
  });
  it("Insert Duplicate Felling, Expect 409", async () => {
    const token = await createToken();
    const felling = fellingFactory.allowFelling();
    await server
      .post("/felling")
      .send(felling)
      .set("Authorization", `Bearer ${token}`);
    const result = await server
      .post("/felling")
      .send(felling)
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(409);
  });
  it("Try Insert Felling Sending No Token, Expect 401", async () => {
    const felling = fellingFactory.allowFelling();
    const result = await server.post("/felling").send(felling);
    expect(result.status).toBe(401);
  });
});

describe("Get Felling GET /felling/:date", () => {
  it("get felling day, expect 200", async () => {
    const token = await createToken();
    const felling = await fellingFactory.createFelling(token);
    const result = await server
      .get("/felling/2022-10-10")
      .send()
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(200);
    expect(result.body.length).toBe(1);
  });
  it("Get Felling day With DB Empty, Expect 200 and []", async () => {
    const token = await createToken();
    const result = await server
      .get("/felling/2022-10-10")
      .send()
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(200);
    expect(result.body.length).toBe(0);
  });
  it("Get Felling dau Sending No Token", async () => {
    const token = await createToken();
    const felling = await fellingFactory.createFelling(token);
    const result = await server.get("/felling/2022-10-10").send();
    expect(result.status).toBe(401);
  });
});
