-- AlterTable
ALTER TABLE "Exam" ALTER COLUMN "hasImage" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE SET NULL ON UPDATE CASCADE;
