import { Answer, Questions } from "@prisma/client";
import prisma from "../database/dabatase";
import { CreateAnswer } from "../types/answerTypes";

async function insert(answerData: CreateAnswer, date: string) {
  console.log("cheguei aq");

  const answerCreated: Answer = await prisma.answer.create({
    data: { ...answerData, date },
  });
  return answerCreated;
}
async function getQuestionById(id: number, userId: number) {
  const question: Questions | null = await prisma.questions.findFirst({
    where: { id, userId },
  });
  return question;
}

async function getAnswerbyDateAndQuestionId(date: string, questionId: number) {
  const answer: Answer | null = await prisma.answer.findFirst({
    where: { date, questionId },
  });
  return answer;
}
export default { insert, getQuestionById, getAnswerbyDateAndQuestionId };
