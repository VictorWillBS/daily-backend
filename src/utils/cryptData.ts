import bcrypt from "bcrypt";

function encriptByHash(data: string): string {
  const dataEncript = bcrypt.hashSync(data, 10);
  return dataEncript;
}

function compareHash(toCompare: string, dataEncript: string): boolean {
  const isSame = bcrypt.compareSync(toCompare, dataEncript);
  return isSame;
}

export default {
  encriptByHash,
  compareHash,
};
