import React from "react";

// Define TypeScript interface for exam data
interface Exam {
  id: number;
  name: string;
  date: string;
  score: number;
  status: "Pass" | "Fail";
}

// Dummy exam history data
const examHistoryData: Exam[] = [
  { id: 1, name: "Math Test", date: "2024-01-10", score: 85, status: "Pass" },
  { id: 2, name: "Science Quiz", date: "2024-02-15", score: 72, status: "Pass" },
  { id: 3, name: "History Exam", date: "2024-03-22", score: 45, status: "Fail" },
  { id: 4, name: "English Test", date: "2024-04-05", score: 90, status: "Pass" },
];

const ExamHistory: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Exam History</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border">Exam Name</th>
              <th className="py-2 px-4 border">Date Taken</th>
              <th className="py-2 px-4 border">Score (%)</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {examHistoryData.map((exam) => (
              <tr key={exam.id} className="text-center">
                <td className="py-2 px-4 border">{exam.name}</td>
                <td className="py-2 px-4 border">{exam.date}</td>
                <td className="py-2 px-4 border">{exam.score}</td>
                <td
                  className={`py-2 px-4 border font-bold ${
                    exam.status === "Pass" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {exam.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamHistory;
