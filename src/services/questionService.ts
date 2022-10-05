import { Questions } from "@prisma/client";
import questionRepository from "../repositories/questionRepository";
import { CreateQuestion } from "../types/questionTypes";
import generateDate from "../utils/generateDate";

async function createQuestion(questionData: CreateQuestion, userId: number) {
  const questionExist = await questionRepository.getByQuestion(
    questionData.question,
    userId
  );

  if (questionExist?.isAble) {
    throw { code: "Conflict", message: "Question Already Exist." };
  }
  if (questionExist && !questionExist.isAble) {
    const questionCreated = await questionRepository.enableById(
      questionExist.id,
      userId
    );
    return questionCreated
      ? { id: questionCreated.id, question: questionCreated.question }
      : "";
  }
  const questionCreated = await questionRepository.insert(questionData, userId);
  return { id: questionCreated.id, question: questionCreated.question };
}

async function getQuestions(userId: number) {
  const today = generateDate(new Date());
  const questions: Questions[] = await questionRepository.getAllToday(
    userId,
    today
  );
  return questions;
}

async function getQuestionsByDate(date: string, userId: number) {
  const questions: Questions[] | any = await questionRepository.getByDate(
    date,
    userId
  );
  return questions;
}

async function disableQuestion(questionId: number, userId: number) {
  const questionExist = await questionRepository.getById(questionId, userId);

  if (!questionExist) {
    throw { code: "Not Found", message: "Question non Exist." };
  }
  const question = await questionRepository.disableById(questionId, userId);

  return question;
}

export default {
  createQuestion,
  getQuestions,
  disableQuestion,
  getQuestionsByDate,
};
