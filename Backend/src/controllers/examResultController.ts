import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const submitExamResult = async (req: Request, res: Response):Promise<void> => {
  try {
    const { userId, examId, score } = req.body;

    if (!userId || !examId || score === undefined) {
       res.status(400).json({ message: "Missing required fields" });
       return;
    }

    const examResult = await prisma.examResult.create({
      data: {
        userId,
        examId,
        score,
      },
    });

    res.status(201).json({ message: "Exam result recorded", examResult });
  } catch (error) {
    console.error("Error submitting exam result:", error);
    res.status(500).json({ message: "Failed to submit exam result" });
  }
};