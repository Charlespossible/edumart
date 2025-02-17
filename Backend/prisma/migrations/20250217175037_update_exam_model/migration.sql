/*
  Warnings:

  - You are about to drop the column `correctOption` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Exam` table. All the data in the column will be lost.
  - Added the required column `correctAnswer` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "correctOption",
DROP COLUMN "imageUrl",
ADD COLUMN     "correctAnswer" TEXT NOT NULL,
ADD COLUMN     "questionImageUr" TEXT;
