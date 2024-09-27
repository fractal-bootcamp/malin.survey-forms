/*
  Warnings:

  - Added the required column `value` to the `Answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Survey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answers" ADD COLUMN     "value" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Survey" ADD COLUMN     "name" TEXT NOT NULL;
