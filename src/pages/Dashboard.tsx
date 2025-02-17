import React, { useState, useContext, useEffect } from "react";
import { FaChartLine, FaTrophy, FaClipboardList } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import Profile from "../components/Profile";
import Performance from "../components/Perfomance";
import ExamHistory from "../components/ExamHistory";
import { AuthContext } from "../context/AuthContext";
import Setting from "../components/Setting";
//import Cookies from "js-cookie";

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState(auth?.user || null);
  const [loading, setLoading] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);
  const [isExamHistoryModalOpen, setIsExamHistoryModalOpen] = useState(false); // State for Exam History modal
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false); // State for Settings modal
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  useEffect(() => {
    if (auth?.user) {
      setUser(auth.user);
      setLoading(false);
    } else {
      //const firstName = Cookies.get("firstName");
      //const role = Cookies.get("role");
      const storedUser = localStorage.getItem("user");
      console.log(localStorage.getItem("accessToken"));
      console.log(storedUser);

  
      //console.log("Cookies retrieved in Dashboard:", { firstName, role }); // Debugging
  
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }
  }, [auth?.user]);
  
  //console.log("Cookies retrieved:", { firstName, role });
   // Toggle sidebar visibility
   const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
       <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative`}
      >
        <Sidebar
          openProfileModal={() => setIsProfileModalOpen(true)}
          openPerformanceModal={() => setIsPerformanceModalOpen(true)}
          openExamHistoryModal={() => setIsExamHistoryModalOpen(true)} // Pass handler for Exam History
          openSettingsModal={() => setIsSettingsModalOpen(true)} // Pass handler for Settings
        />
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          {/* Toggle Sidebar Button (Mobile Only) */}
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
            {loading ? "Loading..." : `Welcome ${user?.firstName}  ${user?.lastName}` }
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
              onClick={() => setIsProfileModalOpen(false)}
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
              onClick={() => setIsPerformanceModalOpen(false)}
              className="mt-4 bg-[#97c966] text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Exam History Modal */}
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

      {/* Settings Modal */}
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
    </div>
  );
};

export default Dashboard;