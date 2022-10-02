import { Request, Response } from "express";
import authService from "../services/authService";
export async function signup(req: Request, res: Response) {
  const userData = req.body;
  const userCreated = await authService.createUser(userData);
  res.status(201).send(userCreated);
}

export async function singin(req: Request, res: Response) {
  const loginData = req.body;
  const userData = await authService.login(loginData);
  res.status(200).send(userData);
}
