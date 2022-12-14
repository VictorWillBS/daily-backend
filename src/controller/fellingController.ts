import { Request, Response } from "express";
import fellingService from "../services/fellingService";
import { CreateFelling } from "../types/fellingTypes";
import cryptData from "../utils/cryptData";

async function createFelling(req: Request, res: Response) {
  const fellingData: CreateFelling = req.body;
  const user = res.locals.tokenDecoded;
  const id = cryptData.decrypt(user.id);
  const fellingInserted = await fellingService.createFelling(
    fellingData,
    Number(id)
  );
  res.status(201).send(fellingInserted);
}

async function getFellingToday(req: Request, res: Response) {
  const user = res.locals.tokenDecoded;
  const date = req.params.date || "";
  const id = cryptData.decrypt(user.id);
  const felling = await fellingService.getFellingToday(date, Number(id));

  res.status(200).send(felling);
}

export default { createFelling, getFellingToday };
