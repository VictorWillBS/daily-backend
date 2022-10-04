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

async function getAllAnswered(userId: number) {
  const userQuestions: Questions[] = await prisma.questions.findMany({
    where: { userId },
    include: { answer: true },
  });
  return userQuestions;
}

async function getByQuestion(question: string, userId: number) {
  const userQuestions: Questions | null = await prisma.questions.findFirst({
    where: { question, userId },
  });
  return userQuestions;
}

async function getById(id: number, userId: number) {
  const userQuestions: Questions | null = await prisma.questions.findFirst({
    where: { id, userId },
  });
  return userQuestions;
}

async function deleteById(id: number, userId: number) {
  await prisma.questions.deleteMany({
    where: { id, userId },
  });
  return true;
}

export default {
  insert,
  getAll,
  deleteById,
  getByQuestion,
  getAllAnswered,
  getById,
};
