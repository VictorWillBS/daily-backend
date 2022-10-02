import { Questions } from "@prisma/client";
import prisma from "../database/dabatase";
import { CreateQuestion } from "../types/questionTypes";

async function insert(questionData: CreateQuestion, userId: number) {
  const questionCreated = await prisma.questions.create({
    data: { ...questionData, userId },
  });
  return questionCreated;
}

async function getAll(userId: number) {
  const userQuestions: Questions[] = await prisma.questions.findMany({
    where: { userId },
  });
  return userQuestions;
}

async function getByQuestion(question: string, userId: number) {
  const userQuestions: Questions | null = await prisma.questions.findFirst({
    where: { question, userId },
  });
  return userQuestions;
}

async function deleteById(id: number) {
  try {
    await prisma.questions.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    return false;
  }
}

export default { insert, getAll, deleteById, getByQuestion };
