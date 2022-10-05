import { Request, Response, NextFunction } from "express";
import tokenFuntions from "../utils/tokenFuntions";
import dotenv from "dotenv";
dotenv.config();

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token: string | any = req.headers.authorization;
  if (!token || !token.startsWith("Bearer")) {
    return res.status(401).send("Invalid Token.");
  }

  try {
    const tokenToValid = token.replace("Bearer ", "");
    const tokenIsValid: string | any = tokenFuntions.verifyToken(tokenToValid);
    res.locals.tokenDecoded = tokenIsValid;
    next();
  } catch (error) {
    res.status(401).send("Invalid Token.");
  }
}
