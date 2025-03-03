import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getExamHistory = async (req: Request, res: Response):Promise<void> => {
  // Get user ID from the authenticated request (attached by middleware)
  const userId = req.user?.id;

  if (!userId) {
        res.status(400).json({ message: "User ID is missing" });
        return;
  }

  try {
    // Fetch all exam results for the user, including exam details
    const examResults = await prisma.examResult.findMany({
      where: { userId },
      include: {
        exam: {
          select: { subjectName: true }, // Only need the exam name
        },
      },
      orderBy: { createdAt: "desc" }, // Sort by most recent first
    });

    // Transform the data into the format expected by the frontend
    const history = examResults.map((result) => ({
      id: result.id,
      name: result.exam.subjectName, // Exam name from Exam model
      date: result.createdAt.toISOString().split("T")[0], // Format as YYYY-MM-DD
      score: result.score,
      status: result.score >= 50 ? "Pass" : "Fail", // Compute status
    }));

    // Send the response
    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching exam history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};