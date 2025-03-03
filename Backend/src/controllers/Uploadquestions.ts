import { Request, Response } from "express";
import csvParser from "csv-parser";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
import { promisify } from "util";

const prisma = new PrismaClient();
const unlinkAsync = promisify(fs.unlink);

interface ProcessedFileResult {
  filename: string;
  count: number;
  errors: string[];
}

// Process a single CSV file
const processSingleFile = async (filePath: string): Promise<ProcessedFileResult> => {
  const result: ProcessedFileResult = {
    filename: filePath,
    count: 0,
    errors: [],
  };

  try {
    const questions: any[] = [];
    const stream = fs.createReadStream(filePath).pipe(csvParser()).on("data", (row) => questions.push(row));

    await new Promise((resolve, reject) => {
      stream.on("end", resolve);
      stream.on("error", reject);
    });

    // Validate and transform data
    const validatedQuestions = questions
      .map((q, index) => {
        const missingFields = [];
        if (!q.questionsGroupId) missingFields.push("questionsGroupId");
        if (!q.subjectName) missingFields.push("subjectName");
        if (!q.year || isNaN(parseInt(q.year))) missingFields.push("year (must be a number)");
        if (!q.question) missingFields.push("question");

        if (missingFields.length > 0) {
          result.errors.push(`Row ${index + 1}: Missing or invalid ${missingFields.join(", ")}`);
          return null;
        }

        return {
          questionsGroupId: q.questionsGroupId,
          subjectName: q.subjectName,
          year: parseInt(q.year),
          question: q.question,
          optionA: q.optionA || null,
          optionB: q.optionB || null,
          optionC: q.optionC || null,
          optionD: q.optionD || null,
          correctAnswer: q.correctAnswer || null,
          explanation: q.explanation || null,
          questionImageUrl: q.questionImageUrl || null,
          hasImage: Boolean(q.questionImageUrl),
        };
      })
      .filter(q => q !== null);

    // Insert into database
    const inserted = await prisma.exam.createMany({
      data: validatedQuestions,
      skipDuplicates: true,
    });

    result.count = inserted.count;
  } catch (error: any) {
    result.errors.push(`Processing error: ${error instanceof Error ? error.message : "Unknown error"}`);
  } finally {
    await unlinkAsync(filePath); // Clean up the temporary file
  }

  return result;
};

// Main upload handler
const uploadQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      res.status(400).json({ message: "No files uploaded." });
      return;
    }

    // Process all files concurrently
    const processingPromises = (req.files as Express.Multer.File[]).map(file => processSingleFile(file.path));
    const results = await Promise.all(processingPromises);

    // Aggregate results
    const totalInserted = results.reduce((sum, r) => sum + r.count, 0);
    const allErrors = results.flatMap(r => r.errors);

    res.status(200).json({
      message: "Batch processing complete",
      totalInserted,
      filesProcessed: results.length,
      errors: allErrors,
      details: results.map(r => ({
        filename: r.filename,
        inserted: r.count,
        errors: r.errors,
      })),
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export default uploadQuestions;