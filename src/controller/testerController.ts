import { Request, Response } from "express";
import testerService from "../services/testerService";
async function clearbank(req: Request, res: Response) {
  await testerService.clearBank();
  return;
}

export default { clearbank };
