import React from "react";

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
      {icon}
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};

export default StatsCard;
