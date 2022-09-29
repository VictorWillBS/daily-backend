import { Users } from "@prisma/client";
import prisma from "../database/dabatase";
import { CreateUser } from "../types/authtypes";

async function findUserByEmail(email: string) {
  const user: Users | null = await prisma.users.findUnique({
    where: { email },
  });
  return user;
}

async function insert(userData: CreateUser) {
  const { name, email, password, photo } = (await prisma.users.create({
    data: { ...userData },
  })) as Users;

  return { name, email, password, photo };
}

export default {
  findUserByEmail,
  insert,
};
