import fellingRepository from "../repositories/fellingRepository";
import { CreateFelling } from "../types/fellingTypes";
import generateDate from "../utils/generateDate";
async function createFelling(fellingData: CreateFelling, userId: number) {
  const fellingExist = await fellingRepository.getByDay(
    fellingData.day,
    userId
  );
  if (fellingExist) {
    throw { code: "Conflict", message: "Felling Already Exist." };
  }
  const fellingUpper = fellingData.felling.toUpperCase();
  const fellingInserted = await fellingRepository.insert(
    fellingData,
    fellingUpper,
    userId
  );
  return fellingInserted;
}

export default { createFelling };
