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

export default { createQuestion };
