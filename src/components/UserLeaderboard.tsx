import React from "react";

// Define TypeScript interface for leaderboard data
interface LeaderboardUser {
  id: number;
  name: string;
  score: number;
  rank: number;
  status: "Gold" | "Silver" | "Bronze" | "Participant";
}

// Dummy leaderboard data (sorted by rank)
const leaderboardData: LeaderboardUser[] = [
  { id: 1, name: "John Doe", score: 98, rank: 1, status: "Gold" },
  { id: 2, name: "Jane Smith", score: 92, rank: 2, status: "Silver" },
  { id: 3, name: "Michael Johnson", score: 88, rank: 3, status: "Bronze" },
  { id: 4, name: "Emily Davis", score: 85, rank: 4, status: "Participant" },
  { id: 5, name: "David Brown", score: 80, rank: 5, status: "Participant" },
];

const UserLeaderboard: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Leaderboard</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="py-3 px-4 border">Rank</th>
              <th className="py-3 px-4 border">Name</th>
              <th className="py-3 px-4 border">Score</th>
              <th className="py-3 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="py-3 px-4 border">{user.rank}</td>
                <td className="py-3 px-4 border">{user.name}</td>
                <td className="py-3 px-4 border">{user.score}</td>
                <td
                  className={`py-3 px-4 border font-bold ${
                    user.status === "Gold"
                      ? "text-yellow-500"
                      : user.status === "Silver"
                      ? "text-gray-400"
                      : user.status === "Bronze"
                      ? "text-orange-500"
                      : "text-gray-700"
                  }`}
                >
                  {user.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserLeaderboard;
