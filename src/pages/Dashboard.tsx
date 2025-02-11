import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaChartLine, FaTrophy, FaClipboardList } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import Profile from "../components/Profile";
import Performance from "../components/Perfomance";
import { AuthContext } from "../components/AuthContext";

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);

  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  const openPerformanceModal = () => setIsPerformanceModalOpen(true);
  const closePerformanceModal = () => setIsPerformanceModalOpen(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  // Fetch the user's first name from localStorage
  //const firstName = localStorage.getItem("user");

  console.log({ user });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        openProfileModal={openProfileModal}
        openPerformanceModal={openPerformanceModal}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">
            {" "}
            {auth?.user ? (
              <h1>Welcome {auth.user.firstName}</h1>
            ) : (
              <h1>Loading...</h1>
            )}
          </h1>
          <button className="bg-[#97c966] text-white px-4 py-2 rounded-md">
            Start New Exam
          </button>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Stats Cards */}
          <StatsCard
            icon={<FaChartLine className="text-[#97c966] text-3xl" />}
            title="Total Exams"
            value="12"
          />
          <StatsCard
            icon={<FaTrophy className="text-[#97c966] text-3xl" />}
            title="Highest Score"
            value="98%"
          />
          <StatsCard
            icon={<FaClipboardList className="text-[#97c966] text-3xl" />}
            title="Exams Passed"
            value="9"
          />
        </main>
      </div>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <Profile />
            <button
              onClick={closeProfileModal}
              className="mt-4 bg-[#97c966] text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Performance Modal */}
      {isPerformanceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <Performance />
            <button
              onClick={closePerformanceModal}
              className="mt-4 bg-[#97c966] text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
