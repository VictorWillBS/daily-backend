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
    throw {
      code: "Conflict",
      message: "Já existe uma pergunta com esse nome.",
    };
  }
  const questionAble = await questionRepository.getAllAble(userId);

  if (questionAble.length >= 5) {
    throw {
      code: "Bad Request",
      message: "Você deve ter no máximo 5 questões.",
    };
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
  const questionsDisables: Questions[] | any =
    await questionRepository.getByDate(date, userId);
  const questionsDisablesAnswered = questionsDisables.filter(
    (question: any) => {
      if (question.answer.length) {
        return question;
      }
    }
  );
  const questionsAbles = await questionRepository.getAllToday(userId, date);

  return [...questionsDisablesAnswered, ...questionsAbles];
}

async function disableQuestion(questionId: number, userId: number) {
  const questionExist = await questionRepository.getById(questionId, userId);

  if (!questionExist) {
    throw { code: "Not Found", message: "Questão não encontrada." };
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
