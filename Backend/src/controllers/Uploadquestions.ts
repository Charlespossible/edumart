import { Request, Response } from "express";
import csvParser from "csv-parser";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const uploadQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded." });
      return;
    }

    const filePath = req.file.path;
    const questions: any[] = [];

    console.log("Reading file from path:", filePath);

    // Read CSV file and parse data
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        console.log("Parsed row:", row);
        questions.push(row);
      })
      .on("end", async () => {
        try {
          console.log("Finished parsing CSV. Total rows:", questions.length);

          if (questions.length === 0) {
            res.status(400).json({ message: "The uploaded file is empty or invalid." });
            return;
          }

          // Validate each row before insertion
          const validatedQuestions = questions.map((q, index) => {
            console.log(`Validating row ${index + 1}:`, q);
            
            const missingFields = [];
            
            if (!q.questionsGroupId) missingFields.push("questionsGroupId");
            if (!q.subjectName) missingFields.push("subjectName");
            if (!q.year) missingFields.push("year");
            //if (!q.optionA) missingFields.push("optionA");
            //if (!q.optionB) missingFields.push("optionB");
            //if (!q.optionC) missingFields.push("optionC");
            //if (!q.optionD) missingFields.push("optionD");
            //if (!q.correctAnswer) missingFields.push("correctAnswer");
            //if (!q.explanation) missingFields.push("explanation");
            //if (!q.questionImageUrl) missingFields.push("questionImageUrl");
            //if (!q.hasImage) missingFields.push("hasImage");
            if (!q.question) missingFields.push("question");
        
            if (missingFields.length > 0) {
                console.error(`Missing fields in row ${index + 1}:`, missingFields.join(", "));
                throw new Error(`Missing required fields in CSV row ${index + 1}: ${missingFields.join(", ")}`);
            }

            return {
              questionsGroupId: q.questionsGroupId,
              subjectName: q.subjectName,
              year: parseInt(q.year),
              //questionText: q.questionText,
              optionA: q.optionA || null,
              optionB: q.optionB || null,
              optionC: q.optionC || null,
              optionD: q.optionD || null,
              correctAnswer: q.correctAnswer || null,
              explanation: q.explanation || null,
              question: q.question,
              questionImageUrl: q.questionImageUrl || null,
              hasImage: q.imageUrl ? true : false,
            };
          });

          console.log("Validated questions:", validatedQuestions);

          // Insert questions into the database
          const insertedQuestions = await prisma.exam.createMany({
            data: validatedQuestions,
          });

          console.log("Inserted questions:", insertedQuestions);

          // Remove the uploaded file
          fs.unlinkSync(filePath);
          res.status(200).json({ message: "Questions uploaded successfully", count: insertedQuestions.count });
        } catch (error) {
          console.error("Error during CSV processing or database insertion:", error);
          res.status(500).json({ message: "Failed to upload questions." });
        }
      })
      .on("error", (error) => {
        console.error("Error parsing CSV file:", error);
        res.status(500).json({ message: "Failed to parse CSV file." });
      });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export default uploadQuestions;