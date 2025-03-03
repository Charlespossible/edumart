import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getBestPerformers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch the best performers based on their scores
    const bestPerformers = await prisma.examResult.findMany({
      select: {
        id: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        exam: {
          select: {
            subjectName: true, 
          },
        },
        score: true,
      },
      orderBy: {
        score: "asc", 
      },
      take: 10, 
    });

     // If no data is available, return a message
     if (bestPerformers.length === 0) {
         res.status(200).json({ message: "No available data" });
         return;
      }

    // Group results by user and their best subjects
    const performersMap = new Map<string, { name: string; subjects: string[]; scores: number[] }>();

    bestPerformers.forEach((result) => {
      const userName = `${result.user.firstName} ${result.user.lastName}`;
      if (!performersMap.has(userName)) {
        performersMap.set(userName, { name: userName, subjects: [], scores: [] });
      }
      performersMap.get(userName)?.subjects.push(result.exam.subjectName); // Add the subject
      performersMap.get(userName)?.scores.push(result.score); // Add the score
    });

    // Convert the map to an array
    const leaderboard = Array.from(performersMap.values()).map((performer) => ({
      name: performer.name,
      bestSubject: performer.subjects[0], // Display the first subject they excelled in
      averageScore: performer.scores.reduce((a, b) => a + b, 0) / performer.scores.length,
    }));

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching best performers:", error);
    res.status(500).json({ message: "Server error" });
  }
};