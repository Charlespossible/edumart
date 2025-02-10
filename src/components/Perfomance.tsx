import React from "react";

const Performance: React.FC = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-md bg-blue-100">
          <h3 className="font-semibold">Total Exams Taken</h3>
          <p className="text-lg font-bold">15</p>
        </div>
        <div className="p-4 border rounded-md bg-[#97c966]">
          <h3 className="font-semibold">Average Score</h3>
          <p className="text-lg font-bold">82%</p>
        </div>
        <div className="p-4 border rounded-md bg-yellow-100">
          <h3 className="font-semibold">Best Performance</h3>
          <p className="text-lg font-bold">Mathematics - 95%</p>
        </div>
        <div className="p-4 border rounded-md bg-red-100">
          <h3 className="font-semibold">Weakest Subject</h3>
          <p className="text-lg font-bold">History - 65%</p>
        </div>
      </div>
    </div>
  );
};

export default Performance;