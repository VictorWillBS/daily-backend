import testerRepository from "../repositories/testerRepository";
async function clearBank() {
  await testerRepository.clearBank();
  return;
}

export default { clearBank };
