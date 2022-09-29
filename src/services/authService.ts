import { CreateUser } from "../types/authtypes";
import authRepository from "../repositories/authRepository";
import cryptData from "../utils/cryptData";
async function createUser(userData: CreateUser) {
  const userExist = await authRepository.findUserByEmail(userData.email);
  if (userExist) {
    console.log("cai aq");
    throw { code: "Conflict", message: "User already exist." };
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
