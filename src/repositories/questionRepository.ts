import { Questions } from "@prisma/client";
import prisma from "../database/dabatase";
import { CreateQuestion } from "../types/questionTypes";

async function insert(questionData: CreateQuestion, userId: number) {
  const questionCreated: Questions = await prisma.questions.create({
    data: { ...questionData, userId },
  });
  return questionCreated;
}
async function getAllAble(userId: number) {
  const userQuestions: Questions[] = await prisma.questions.findMany({
    where: { userId, isAble: true },
  });
  return userQuestions;
}
async function getAllToday(userId: number, date: string) {
  const userQuestions: Questions[] = await prisma.questions.findMany({
    where: { userId, isAble: true },
    include: { answer: { where: { date } } },
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

async function getByDate(date: string, userId: number) {
  try {
    const userQuestions: Questions[] = await prisma.questions.findMany({
      include: { answer: { where: { date } } },
      where: { userId, isAble: false },
    });
    return userQuestions;
  } catch (error) {
    console.log(error);
  }
}

async function getById(id: number, userId: number) {
  const userQuestions: Questions | null = await prisma.questions.findFirst({
    where: { id, userId, isAble: true },
  });
  return userQuestions;
}

async function disableById(id: number, userId: number) {
  await prisma.questions.updateMany({
    where: { id, userId },
    data: { isAble: false },
  });
  return true;
}
async function enableById(id: number, userId: number) {
  await prisma.questions.updateMany({
    where: { id, userId },
    data: { isAble: true },
  });
  const questionCreated = await prisma.questions.findFirst({
    where: { id, userId },
  });
  return questionCreated;
}

export default {
  insert,
  getAllToday,
  disableById,
  getByQuestion,
  getAllAnswered,
  getById,
  enableById,
  getByDate,
  getAllAble,
};
