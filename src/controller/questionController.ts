import questionService from "../services/questionService";
import { Request, Response } from "express";
import { CreateQuestion } from "../types/questionTypes";
import cryptData from "../utils/cryptData";
async function createQuestion(req: Request, res: Response) {
  const questionData: CreateQuestion = req.body;

  const user = res.locals.tokenDecoded;
  const id = cryptData.decrypt(user.id);
  const questionCreated = await questionService.createQuestion(
    questionData,
    Number(id)
  );
  res.status(201).send(questionCreated);
}

async function getQuestions(req: Request, res: Response) {
  const user = res.locals.tokenDecoded;
  const id = cryptData.decrypt(user.id);
  const questions = await questionService.getQuestions(Number(id));
  res.send(questions);
}

async function getQuestionsByDate(req: Request, res: Response) {
  const { date } = req.params;
  const user = res.locals.tokenDecoded;
  const id = cryptData.decrypt(user.id);
  const questions = await questionService.getQuestionsByDate(date, Number(id));
  res.send(questions);
}

async function disableQuestion(req: Request, res: Response) {
  const user = res.locals.tokenDecoded;
  const userId = cryptData.decrypt(user.id);
  const { id } = req.params;
  const questions = await questionService.disableQuestion(
    Number(id),
    Number(userId)
  );
  res.send(questions);
}

export default {
  createQuestion,
  getQuestions,
  disableQuestion,
  getQuestionsByDate,
};
