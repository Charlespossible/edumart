import React, { useEffect, useState } from "react";
import axios from "axios";

interface LeaderboardEntry {
  name: string;
  bestSubject: string;
  averageScore: string;
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/leaderboard");
        setLeaderboard(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Top Performers
        <hr className="border-b-4 border-[#97c966] mt-4 mb-8 w-48 mx-auto"></hr>
      </h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-[#97c966] text-white">
              <th className="py-3 px-4 text-center">Rank</th>
              <th className="py-3 px-4 text-center">Name</th>
              <th className="py-3 px-4 text-center">Best Subject</th>
              <th className="py-3 px-4 text-center">Average Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{entry.name}</td>
                <td className="py-3 px-4">{entry.bestSubject}</td>
                <td className="py-3 px-4">{entry.averageScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;