import bcrypt from "bcrypt";
import Cryptr from "cryptr";
import dotenv from "dotenv";
dotenv.config();
const cryptr = new Cryptr(`${process.env.CRYPTR_SECRET}`);
function encrypt(data: string) {
  const dataEncrypt: string = cryptr.encrypt(data);
  return dataEncrypt;
}

function decrypt(data: string) {
  console.log(data);

  const dataDecrypt: string = cryptr.decrypt(data);
  return dataDecrypt;
}

function compareEncrypted(data1: string, data2: string) {
  const dataDecrypt1: string = cryptr.decrypt(data1);
  const dataDecrypt2: string = cryptr.decrypt(data2);

  return dataDecrypt1 === dataDecrypt2;
}

function encriptByHash(data: string) {
  const dataEncript: string = bcrypt.hashSync(data, 10);
  return dataEncript;
}

function compareHash(toCompare: string, dataEncript: string) {
  const isSame: boolean = bcrypt.compareSync(toCompare, dataEncript);
  return isSame;
}

export default {
  encriptByHash,
  compareHash,
  encrypt,
  decrypt,
  compareEncrypted,
};
