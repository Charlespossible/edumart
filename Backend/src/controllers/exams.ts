import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//fetch exam types

export const examTypes = async (req: Request, res: Response) => {
  try {
    const exams = await prisma.exam.findMany({
      select: { id: true, examType: true },
      distinct: ["examType"],
    });
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch exams." });
  }
};

export const subjects = async (req: Request, res: Response) => {
  const { questionsGroupId } = req.query;
  try {
    const subjects = await prisma.exam.findMany({
      where: { questionsGroupId: questionsGroupId as string },
      select: { subjectName: true },
      distinct: ["subjectName"],
    });
    res.json(subjects.map((s) => s.subjectName));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch subjects." });
  }
};

export const years = async (req: Request, res: Response) => {
  const { questionsGroupId, subjectName } = req.query;
  try {
    const years = await prisma.exam.findMany({
      where: {
        questionsGroupId: questionsGroupId as string,
        subjectName: subjectName as string,
      },
      select: { year: true },
      distinct: ["year"],
      orderBy: {
        year: "asc", 
      },
    });
    res.json(years.map((y) => y.year));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch years." });
  }
};

export const Questions = async (req: Request, res: Response): Promise<void> => {
  const { subjectName, year } = req.query;

  // Validate query parameters
  if ( !subjectName || !year) {
    res
      .status(400)
      .json({ message: "Missing required query parameters." });
      return;
  }

  try {
    const questions = await prisma.exam.findMany({
      where: {
        subjectName: subjectName as string,
        year: parseInt(year as string),
      },
      select: {
        id: true,
        question: true,
        optionA: true,
        optionB: true,
        optionC: true,
        optionD: true,
        correctAnswer: true,
        hasImage: true,
        questionImageUrl: true,
      },
    });

    // Check if questions were found
    if (questions.length === 0) {
      res
        .status(404)
        .json({ message: "No questions found for the specified filters." });
        return;
    }

    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Failed to fetch questions." });
  }
};


export const validateAnswer = async (req: Request, res: Response): Promise<void> => {
  const { questionId, userAnswer } = req.body;

  if (!questionId || !userAnswer) {
    res.status(400).json({ message: "Missing required fields: questionId and userAnswer." });
    return;
  }

  try {
    const question = await prisma.exam.findUnique({
      where: { id: questionId },
      select: { correctAnswer: true },
    });

    if (!question) {
      res.status(404).json({ message: "Question not found." });
      return;
    }
    
    const isCorrect = userAnswer.trim().toLowerCase() === question.correctAnswer?.trim().toLowerCase();
    res.json({ isCorrect });
  } catch (error) {
    console.error("Error validating answer:", error);
    res.status(500).json({ message: "Failed to validate answer." });
  }
};








