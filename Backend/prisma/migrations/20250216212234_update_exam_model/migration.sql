/*
  Warnings:

  - You are about to drop the column `description` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `Exam` table. All the data in the column will be lost.
  - Added the required column `correctOption` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionA` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionB` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionC` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionD` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionText` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionsGroupId` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectName` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "description",
DROP COLUMN "name",
DROP COLUMN "subject",
ADD COLUMN     "correctOption" TEXT NOT NULL,
ADD COLUMN     "explanation" TEXT,
ADD COLUMN     "hasImage" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "optionA" TEXT NOT NULL,
ADD COLUMN     "optionB" TEXT NOT NULL,
ADD COLUMN     "optionC" TEXT NOT NULL,
ADD COLUMN     "optionD" TEXT NOT NULL,
ADD COLUMN     "questionText" TEXT NOT NULL,
ADD COLUMN     "questionsGroupId" TEXT NOT NULL,
ADD COLUMN     "subjectName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
