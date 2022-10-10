import prisma from "../database/dabatase";

async function clearBank() {
  await prisma.$executeRaw`
  TRUNCATE TABLE question RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`
  TRUNCATE TABLE users RESTART IDENTITY CASCADE;
`;
  await prisma.$executeRaw`
TRUNCATE TABLE answer RESTART IDENTITY CASCADE;
`;
  await prisma.$executeRaw`
TRUNCATE TABLE fellings RESTART IDENTITY CASCADE;
`;
}
export default { clearBank };
