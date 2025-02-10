import React from "react";

type User = {
  id: number;
  name: string;
  scores: { subject: string; score: number }[]; // Each user has scores for multiple subjects
};

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    scores: [
      { subject: "English", score: 250 },
      { subject: "Maths", score: 230 },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    scores: [
      { subject: "English", score: 240 },
      { subject: "Maths", score: 260 },
    ],
  },
  {
    id: 3,
    name: "Alice Johnson",
    scores: [
      { subject: "English", score: 200 },
      { subject: "Maths", score: 190 },
    ],
  },
  {
    id: 4,
    name: "Bob Brown",
    scores: [
      { subject: "English", score: 180 },
      { subject: "Maths", score: 170 },
    ],
  },
  {
    id: 5,
    name: "Charlie White",
    scores: [
      { subject: "English", score: 210 },
      { subject: "Maths", score: 200 },
    ],
  },
];

const Leaderboard: React.FC = () => {
  // Calculate the highest score for each user across all subjects
  const usersWithHighestScores = mockUsers.map((user) => ({
    ...user,
    highestScore: Math.max(...user.scores.map((score) => score.score)), // Find the highest score for each user
  }));

  // Sort users by their highest score in descending order
  const sortedUsers = usersWithHighestScores.sort(
    (a, b) => b.highestScore - a.highestScore
  );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          EduMart CBT Leaderboard
        </h1>
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-gray-600 font-medium">Rank</th>
              <th className="p-3 text-gray-600 font-medium">Name</th>
              <th className="p-3 text-gray-600 font-medium">Highest Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="p-3 font-semibold text-gray-700">{index + 1}</td>
                <td className="p-3 text-gray-700">{user.name}</td>
                <td className="p-3 text-gray-700">{user.highestScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
