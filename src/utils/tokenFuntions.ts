import jwt from "jsonwebtoken";
import { IUserJson } from "../types/authtypes";
import dotenv from "dotenv";
dotenv.config();
function createJWT(
  data: IUserJson,
  expiration?: { expiresIn: string | number }
) {
  const paylog = { ...data };
  const expiresIn = expiration || { expiresIn: "1h" };
  const secret = `${process.env.JWT_SECRET}`;
  const token = jwt.sign(paylog, secret, expiresIn);
  return token;
}

function verifyToken(token: string) {
  const secret = `${process.env.JWT_SECRET}`;
  const decoded = jwt.verify(token, secret);
  return decoded;
}

export default {
  createJWT,
  verifyToken,
};
