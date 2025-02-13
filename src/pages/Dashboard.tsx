import React, { useState, useContext, useEffect } from "react";
import { FaChartLine, FaTrophy, FaClipboardList } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import Profile from "../components/Profile";
import Performance from "../components/Perfomance";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState(auth?.user || null);
  const [loading, setLoading] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);

  useEffect(() => {
    if (auth?.user) {
      setUser(auth.user);
      setLoading(false);
    } else {
      const firstName = Cookies.get("firstName");
      const role = Cookies.get("role");
  
      console.log("Cookies retrieved in Dashboard:", { firstName, role }); // Debugging
  
      if (firstName && role) {
        setUser({ firstName, role });
      }
      setLoading(false);
    }
  }, [auth?.user]);
  
  //console.log("Cookies retrieved:", { firstName, role });


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        openProfileModal={() => setIsProfileModalOpen(true)}
        openPerformanceModal={() => setIsPerformanceModalOpen(true)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">
            {loading ? "Loading..." : `Welcome ${auth?.user?.firstName}`}
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
    </div>
  );
};

export default Dashboard;