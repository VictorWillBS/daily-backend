/*
  Warnings:

  - A unique constraint covering the columns `[felling,day,userId]` on the table `fellings` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "fellings_felling_day_key";

-- CreateIndex
CREATE UNIQUE INDEX "fellings_felling_day_userId_key" ON "fellings"("felling", "day", "userId");
