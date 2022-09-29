import { Request, Response, NextFunction } from "express";
import discoverStatusCode from "../utils/discoverStatusCode";

export default async function errorHandle(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("entrei no error");
  if (error) {
    const statusCode = discoverStatusCode(error.code);
    return res.status(statusCode).send(error.message);
  }

  res.status(500).send("Internal Server Error");
}
