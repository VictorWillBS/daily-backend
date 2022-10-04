import fellingRepository from "../repositories/fellingRepository";
import { CreateFelling } from "../types/fellingTypes";
import generateDate from "../utils/generateDate";
async function createFelling(fellingData: CreateFelling, userId: number) {
  const fellingExist = await fellingRepository.getByDay(
    fellingData.day,
    userId
  );
  if (fellingExist.length) {
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

async function getFellingToday(userId: number) {
  const today = generateDate(new Date());
  const felling = await fellingRepository.getByDay(today, userId);

  return felling;
}
export default { createFelling, getFellingToday };
