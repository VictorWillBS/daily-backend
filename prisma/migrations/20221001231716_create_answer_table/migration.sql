/*
  Warnings:

  - You are about to drop the column `answer` on the `question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "question" DROP COLUMN "answer";

-- CreateTable
CREATE TABLE "answer" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "answer_answer_questionId_key" ON "answer"("answer", "questionId");

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
