import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaUpload,
  FaUsersCog,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    
    <aside className="w-64 bg-[#97c966] text-white hidden md:flex flex-col p-4 h-full">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/admin/users"
              className="flex items-center space-x-3 hover:text-gray-300"
            >
              <FaUsersCog /> <span>Manage Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/upload"
              className="flex items-center space-x-3 hover:text-gray-300"
            >
              <FaUpload /> <span>Upload Questions</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/createadmin"
              className="flex items-center space-x-3 hover:text-gray-300"
            >
              <FaUser /> <span>Create Admin</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="settings"
              className="flex items-center space-x-3 hover:text-gray-300"
            >
              <FaCog /> <span>Settings</span>
            </NavLink>
          </li>
          <li className="mt-6">
            <NavLink
              to="/admin/logout"
              className="flex items-center space-x-3 hover:text-gray-300"
            >
              <FaSignOutAlt /> <span>Logout</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;


