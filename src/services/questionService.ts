import { Questions } from "@prisma/client";
import questionRepository from "../repositories/questionRepository";
import { CreateQuestion } from "../types/questionTypes";

async function createQuestion(questionData: CreateQuestion, userId: number) {
  const questionExist = await questionRepository.getByQuestion(
    questionData.question,
    userId
  );

  if (questionExist) {
    throw { code: "Conflict", message: "Question Already Exist." };
  }
  const questionCreated = await questionRepository.insert(questionData, userId);
  return { id: questionCreated.id, question: questionCreated.question };
}

async function getQuestions(userId: number) {
  const questions: Questions[] = await questionRepository.getAllAnswered(
    userId
  );
  return questions;
}

async function deleteQuestion(questionId: number, userId: number) {
  const questionExist = await questionRepository.getById(questionId, userId);

  if (!questionExist) {
    throw { code: "Not Found", message: "Question non Exist." };
  }
  const question = await questionRepository.deleteById(questionId, userId);

  return question;
}

export default { createQuestion, getQuestions, deleteQuestion };
