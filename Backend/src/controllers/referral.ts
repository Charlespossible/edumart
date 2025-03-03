import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// API endpoint to fetch referral stats
export const getStats =  async (req:Request , res:Response):Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const userId = req.user.id; // Get authenticated user's ID

    // Aggregate referral data for the user
    const referralStats = await prisma.referral.aggregate({
      where: { referrerId: userId }, // Filter by user's ID
      _count: { id: true }, // Count number of referrals
      _sum: { earnings: true }, // Sum total earnings
    });

    // Format the response, defaulting to 0 if no data
    const stats = {
      referredCount: referralStats._count.id || 0,
      totalEarnings: referralStats._sum.earnings || 0,
    };

    // Send successful response
    res.status(200).json(stats);
  } catch (error) {
    // Log error and send error response
    console.error('Error fetching referral stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

