import React, { useState, useContext, useEffect } from "react";
import { FaChartLine, FaTrophy, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import Profile from "../components/Profile";
import Performance from "../components/Perfomance";
import ExamHistory from "../components/ExamHistory";
import { AuthContext } from "../context/AuthContext";
import Setting from "../components/Setting";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState(auth?.user || null);
  const [loading, setLoading] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);
  const [isExamHistoryModalOpen, setIsExamHistoryModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [referredCount, setReferredCount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      setUser(auth.user);
      setLoading(false);
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }
  }, [auth?.user]);

  useEffect(() => {
    const fetchReferralStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/referrals/referral-stats",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setReferredCount(response.data.referredCount || 0);
        setTotalEarnings(response.data.totalEarnings || 0);
      } catch (error) {
        toast.error("Failed to fetch referral stats");
      }
    };

    if (!loading && user) {
      fetchReferralStats();
    }
  }, [loading, user]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleStartNewExam = () => {
    navigate("/exams");
  };

  const handleCopyReferralLink = () => {
    const referralLink = `${window.location.origin}/register?ref=${user?.email}`;
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied to clipboard!");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative`}
      >
        <Sidebar
          openProfileModal={() => setIsProfileModalOpen(true)}
          openPerformanceModal={() => setIsPerformanceModalOpen(true)}
          openExamHistoryModal={() => setIsExamHistoryModalOpen(true)}
          openSettingsModal={() => setIsSettingsModalOpen(true)}
        />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">
            {loading
              ? "Loading..."
              : `Welcome ${user?.firstName} ${user?.lastName}`}
          </h1>
          <button
            onClick={handleStartNewExam}
            className="bg-[#97c966] text-white px-4 py-2 rounded-md hover:bg-[#85b35c] transition-colors"
          >
            Start New Exam
          </button>
        </header>

        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
          </div>

          {/* Referral Section */}
          {!loading && user && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Referral Link */}
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2 text-[#78846f]">
                  Referral Link
                </h2>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={`${window.location.origin}/register?ref=${user.email}`}
                    readOnly
                    className="flex-1 px-3 py-2 border rounded-l-lg bg-gray-50 text-sm focus:outline-none"
                  />
                  <button
                    onClick={handleCopyReferralLink}
                    className="bg-[#97c966] text-white px-4 py-2 rounded-r-lg hover:bg-[#85b35c] transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* Number of Referrals */}
              <div className="p-4 bg-white rounded-lg shadow-md flex flex-col justify-between">
                <h2 className="text-lg font-semibold mb-2 text-[#78846f]">
                  Referrals
                </h2>
                <p className="text-2xl font-bold text-[#97c966]">
                  {referredCount} Users
                </p>
              </div>

              {/* Total Earnings */}
              <div className="p-4 bg-white rounded-lg shadow-md flex flex-col justify-between">
                <h2 className="text-lg font-semibold mb-2 text-[#78846f]">
                  Total Earnings
                </h2>
                <p className="text-2xl font-bold text-[#97c966]">
                  ₦{totalEarnings.toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <Profile />
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="mt-4 bg-[#97c966] text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isPerformanceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <Performance />
            <button
              onClick={() => setIsPerformanceModalOpen(false)}
              className="mt-4 bg-[#97c966] text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isExamHistoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <ExamHistory />
            <button
              onClick={() => setIsExamHistoryModalOpen(false)}
              className="mt-4 bg-[#97c966] text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <Setting />
            <button
              onClick={() => setIsSettingsModalOpen(false)}
              className="mt-4 bg-[#97c966] text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Dashboard;