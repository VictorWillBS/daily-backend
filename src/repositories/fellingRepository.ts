import { Fellings } from "@prisma/client";
import prisma from "../database/dabatase";
import { CreateFelling } from "../types/fellingTypes";

async function insert(
  fellingData: CreateFelling,
  fellingUpper: any,
  userId: number
) {
  try {
    console.log(fellingUpper);
    const fellingInserted: Fellings = await prisma.fellings.create({
      data: { ...fellingData, felling: "TRISTE", userId },
    });
    return fellingInserted;
  } catch (error) {
    console.log(error);
  }
}

async function getAll(userId: number) {
  const fellings: Fellings[] = await prisma.fellings.findMany({
    where: { userId },
  });
  return fellings;
}

async function getByDay(day: string | any, userId: number) {
  const fellings: Fellings[] | null = await prisma.fellings.findMany({
    where: { userId, day },
  });
  return fellings;
}

export default { insert, getByDay, getAll };
