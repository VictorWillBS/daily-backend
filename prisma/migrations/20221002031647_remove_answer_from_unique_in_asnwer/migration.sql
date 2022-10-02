/*
  Warnings:

  - A unique constraint covering the columns `[questionId,date]` on the table `answer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "answer_answer_questionId_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "answer_questionId_date_key" ON "answer"("questionId", "date");
