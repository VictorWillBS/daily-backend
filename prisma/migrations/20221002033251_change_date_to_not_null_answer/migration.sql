/*
  Warnings:

  - Made the column `date` on table `answer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "answer" ALTER COLUMN "date" SET NOT NULL;
