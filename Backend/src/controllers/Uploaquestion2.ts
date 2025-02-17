import { Request, Response } from "express";
//import multer from "multer";
import XLSX from "xlsx";
import { PrismaClient } from "@prisma/client";
import { Express } from "express-serve-static-core";


const prisma = new PrismaClient();


/**
 * Handles the upload of an Excel or CSV file containing questions and inserts the data into the `Exam` table.
 * @param req - Express request object with file data.
 * @param res - Express response object.
 */
export const uploadQuestions = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
       res.status(400).json({ message: "No file uploaded." });
       return ;
        
      }
  
      // Read the uploaded file
      const workbook = XLSX.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0]; // Assuming the first sheet contains the data
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
  
      // Validate the data
      if (!Array.isArray(jsonData) || jsonData.length === 0) {
        res.status(400).json({ message: "The file is empty or invalid." });
        return ;
        
      }
  
      // Map the data to the Exam model
      const mappedData = jsonData.map((row: any) => ({
        questionsGroupId: row.questionsGroupId,
        subjectName: row.subjectName,
        year: parseInt(row.year, 10),
        questionText: row.question,
        optionA: row.optionA,
        optionB: row.optionB,
        optionC: row.optionC,
        optionD: row.optionD,
        correctOption: row.correctAnswer,
        explanation: row.explanation || null,
        imageUrl: row.questionImageUrl || null,
        hasImage: row.hasImage === "true",
      }));
  
      // Insert the data into the Exam table
      await prisma.exam.createMany({
        data: mappedData,
      });
  
      res.status(200).json({ message: "Questions uploaded successfully!" });
    } catch (error) {
      console.error("Error uploading questions:", error);
      res.status(500).json({ message: "An error occurred while uploading questions." });
    }
  };