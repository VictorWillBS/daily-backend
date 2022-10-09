import { CreateUser, Login } from "../types/authtypes";
import authRepository from "../repositories/authRepository";
import cryptData from "../utils/cryptData";
import jsonFunctions from "../utils/tokenFuntions";
async function createUser(userData: CreateUser) {
  const userExist = await authRepository.findUserByEmail(userData.email);
  if (userExist) {
    throw { code: "Conflict", message: "Usuário Já Existe." };
  }
  const encriptPassword = cryptData.encriptByHash(userData.password);
  const userCreated = await authRepository.insert({
    ...userData,
    password: encriptPassword,
  });
  return userCreated;
}

async function login(userData: Login) {
  const userExist = await authRepository.findUserByEmail(userData.email);
  if (!userExist) {
    throw { code: "Unauthorized", message: "Email ou Senha Está Incorreto" };
  }
  const passwordIsCorrect = cryptData.compareHash(
    userData.password,
    userExist.password
  );
  if (!passwordIsCorrect) {
    throw { code: "Unauthorized", message: "Email ou Senha Está Incorreto" };
  }
  const encryptId = cryptData.encrypt(userExist.id.toString());
  const token = jsonFunctions.createJWT({
    id: encryptId,
    name: userExist.name,
  });
  return {
    username: userExist.name,
    userId: userExist.id,
    photo: userExist.photo,
    token,
  };
}

export default {
  createUser,
  login,
};
