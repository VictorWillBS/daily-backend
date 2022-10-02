import answerRepository from "../repositories/answerRepository";
import { CreateAnswer } from "../types/answerTypes";
import generateDate from "../utils/generateDate";

async function insertAnswer(answerData: CreateAnswer, userId: number) {
  await verifyQuestion(answerData.questionId, userId);
  const today = generateDate();
  await verifyAnswer(today, answerData.questionId);
  const answerCreated = await answerRepository.insert(answerData, today);
  return answerCreated;
}

async function verifyQuestion(questionId: number, userId: number) {
  const questionExist = await answerRepository.getQuestionById(
    questionId,
    userId
  );
  if (!questionExist) {
    throw { code: "Not Found", message: "Question No Found" };
  }
}
async function verifyAnswer(date: string, questionId: number) {
  const answerExist = await answerRepository.getAnswerbyDateAndQuestionId(
    date,
    questionId
  );
  if (answerExist) {
    throw { code: "Conflict", message: "Question Already Answered Today." };
  }
}

export default { insertAnswer };
