import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../../src/app";

const server = supertest(app);

function allowFelling() {
  return {
    day: "2022-10-10",
    felling: "Feliz",
  };
}

async function createFelling(token: string) {
  const felling = allowFelling();
  const result = await server
    .post("/felling")
    .send(felling)
    .set("Authorization", `Bearer ${token}`);

  return result.body;
}
export default { allowFelling, createFelling };
