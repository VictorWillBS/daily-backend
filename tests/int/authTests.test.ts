import app from "../../src/app";
import supertest from "supertest";
import prisma from "../../src/database/dabatase";
import authFactory from "../factory/int/authFactory";
import commonFactory from "../factory/unit/commonFactory";
beforeEach(() => {
  prisma.$executeRaw`TRUNCATE users RESTART IDENTITy`;
});

afterAll(() => {
  prisma.$disconnect;
});

const server = supertest(app);

describe("Sing-Up User", () => {
  it("Create New User, Expect 201", async () => {
    const signup = authFactory.allowedSingup();
    const result = await server.post("/signup").send(signup);
    expect(result.status).toBe(201);
  });
  it("Create New User With Email Used, Expect 409", async () => {
    const signup = authFactory.allowedSingup();
    await server.post("/signup").send(signup);
    const result = await server.post("/signup").send(signup);
    console.log(result.text);
    expect(result.status).toBe(409);
    expect(result.text).toBe("Usuário Já Existe.");
  });
});

describe("Sing-In User", () => {
  it("Login User, Expect 200", async () => {
    const signUp = authFactory.allowedSingup();
    await authFactory.createUser(signUp);
    const signin = { email: signUp.email, password: signUp.password };
    const result = await server.post("/signin").send(signin);
    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("token");
  });
  it("Login User With Wrong Email, Expect 401", async () => {
    const signUp = authFactory.allowedSingup();
    await authFactory.createUser(signUp);
    const signin = {
      email: `${commonFactory.randomString()}@test.com`,
      password: signUp.password,
    };
    const result = await server.post("/signin").send(signin);
    expect(result.status).toBe(401);
    expect(result.text).toBe("Email ou Senha Está Incorreto");
  });
  it("Login User With Wrong Password, Expect 401", async () => {
    const signUp = authFactory.allowedSingup();
    await authFactory.createUser(signUp);
    const signin = {
      email: signUp.email,
      password: commonFactory.randomString(),
    };

    const result = await server.post("/signin").send(signin);

    expect(result.status).toBe(401);
    expect(result.text).toBe("Email ou Senha Está Incorreto");
  });
  it("Login User No Sending Data, Expect 422", async () => {
    const signUp = authFactory.allowedSingup();
    await authFactory.createUser(signUp);
    const signin = {
      email: "",
      password: "",
    };
    const result = await server.post("/signin").send(signin);
    expect(result.status).toBe(422);
  });
});
