/*
  Warnings:

  - Changed the type of `felling` on the `fellings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Felling" AS ENUM ('TRISTE', 'NEUTRO', 'FELIZ');

-- AlterTable
ALTER TABLE "fellings" DROP COLUMN "felling",
ADD COLUMN     "felling" "Felling" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "fellings_felling_day_key" ON "fellings"("felling", "day");
