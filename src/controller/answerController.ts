import { Request, Response } from "express";
import answerService from "../services/answerService";
import { CreateAnswer } from "../types/answerTypes";
import cryptData from "../utils/cryptData";

async function createAnswer(req: Request, res: Response) {
  const answerData: CreateAnswer = req.body;
  const user = res.locals.tokenDecoded;
  const id = cryptData.decrypt(user.id);
  const answerCreated = await answerService.insertAnswer(
    answerData,
    Number(id)
  );
  res.status(201).send(answerCreated);
}

export default { createAnswer };
