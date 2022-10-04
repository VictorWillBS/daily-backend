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
export default { createFelling };
