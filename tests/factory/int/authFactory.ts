import { faker } from "@faker-js/faker";
import { Users } from "@prisma/client";
import prisma from "../../../src/database/dabatase";
import cryptData from "../../../src/utils/cryptData";

function allowedSingup() {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(15),
    photo: faker.internet.avatar(),
  };
}

async function createUser(userData: Omit<Users, "id">) {
  const passwordEncrypted = cryptData.encriptByHash(userData.password);
  const userCreated = await prisma.users.create({
    data: { ...userData, password: passwordEncrypted },
  });
  return userCreated;
}

export default { allowedSingup, createUser };
