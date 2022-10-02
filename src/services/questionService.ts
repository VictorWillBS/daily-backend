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
  const questions: Questions[] = await questionRepository.getAll(userId);
  return questions;
}
export default { createQuestion, getQuestions };