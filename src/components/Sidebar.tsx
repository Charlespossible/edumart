import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaChartLine, FaClipboardList, FaTrophy, FaCog, FaSignOutAlt } from "react-icons/fa";

interface SidebarProps {
  openProfileModal: () => void;
  openPerformanceModal: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ openProfileModal, openPerformanceModal }) => {
  return (
    <aside className="w-64 bg-[#97c966] text-white hidden md:flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6">Exam Dashboard</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <button
              onClick={openProfileModal}
              className="flex items-center space-x-3 hover:text-gray-300 w-full text-left"
            >
              <FaUser /> <span>Profile</span>
            </button>
          </li>
          <li>
            <button
              onClick={openPerformanceModal}
              className="flex items-center space-x-3 hover:text-gray-300 w-full text-left"
            >
              <FaChartLine /> <span>Performance</span>
            </button>
          </li>
          <li>
            <NavLink to="/exam-history" className="flex items-center space-x-3 hover:text-gray-300">
              <FaClipboardList /> <span>Exam History</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/user-leaderboard" className="flex items-center space-x-3 hover:text-gray-300">
              <FaTrophy /> <span>Leaderboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className="flex items-center space-x-3 hover:text-gray-300">
              <FaCog /> <span>Settings</span>
            </NavLink>
          </li>
          <li className="mt-6">
            <NavLink to="/logout" className="flex items-center space-x-3 hover:text-gray-300">
              <FaSignOutAlt /> <span>Logout</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;