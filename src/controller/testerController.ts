import { Request, Response } from "express";
import testerService from "../services/testerService";

async function clearbank(req: Request, res: Response) {
  await testerService.clearBank();
  res.sendStatus(200);
}

export default { clearbank };
