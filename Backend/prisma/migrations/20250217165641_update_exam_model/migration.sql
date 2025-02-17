/*
  Warnings:

  - Added the required column `question` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_examId_fkey";

-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "question" TEXT NOT NULL;
