/*
  Warnings:

  - You are about to drop the column `userId` on the `answer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "answer" DROP CONSTRAINT "answer_userId_fkey";

-- AlterTable
ALTER TABLE "answer" DROP COLUMN "userId",
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "question" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
