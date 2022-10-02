/*
  Warnings:

  - A unique constraint covering the columns `[answer,questionId,date]` on the table `answer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "answer_answer_questionId_key";

-- CreateIndex
CREATE UNIQUE INDEX "answer_answer_questionId_date_key" ON "answer"("answer", "questionId", "date");
