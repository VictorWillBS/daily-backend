import { CreateUser } from "../types/authtypes";
import authRepository from "../repositories/authRepository";
import cryptData from "../utils/cryptData";
async function createUser(userData: CreateUser) {
  const userExist = await authRepository.findUserByEmail(userData.email);
  if (userExist) {
    throw { code: "Conflict", message: "User Already Exist" };
  }
  const encriptPassword = cryptData.encriptByHash(userData.password);
  const userCreated = await authRepository.insert({
    ...userData,
    password: encriptPassword,
  });
  return userCreated;
}

export default {
  createUser,
};
