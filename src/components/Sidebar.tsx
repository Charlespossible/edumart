import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaChartLine, FaClipboardList, FaCog, FaSignOutAlt } from "react-icons/fa";

interface SidebarProps {
  openProfileModal: () => void;
  openPerformanceModal: () => void;
  openExamHistoryModal: () => void;
  openSettingsModal: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  openProfileModal,
  openPerformanceModal,
  openExamHistoryModal,
  openSettingsModal,
}) => {
  return (
    <aside className="w-64 bg-[#97c966] text-white h-full flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6">User Dashboard</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <button
              onClick={openProfileModal}
              className="flex items-center space-x-3 hover:text-gray-300 w-full text-left"
            >
              <FaUser className="text-white" /> <span>Profile</span>
            </button>
          </li>
          <li>
            <button
              onClick={openPerformanceModal}
              className="flex items-center space-x-3 hover:text-gray-300 w-full text-left"
            >
              <FaChartLine className="text-white" /> <span>Performance</span>
            </button>
          </li>
          <li>
            <button
              onClick={openExamHistoryModal}
              className="flex items-center space-x-3 hover:text-gray-300 w-full text-left"
            >
              <FaClipboardList className="text-white" /> <span>Exam History</span>
            </button>
          </li>
          <li>
            <button
              onClick={openSettingsModal}
              className="flex items-center space-x-3 hover:text-gray-300 w-full text-left"
            >
              <FaCog className="text-white" /> <span>Settings</span>
            </button>
          </li>
          <li className="mt-6">
            <NavLink
              to="/logout"
              className="flex items-center space-x-3 hover:text-gray-300 w-full text-left"
            >
              <FaSignOutAlt className="text-white" /> <span>Logout</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;