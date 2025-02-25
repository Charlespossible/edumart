import React from "react";
import Sidebar from "../admin/Sidebar";
import UsersTable from "../admin/UsersTable"
import UploadQuestions from "../admin/UploadQuestions";
import CreateAdmin from "../admin/CreateAdmin";

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white">
  <header className="shadow p-4 flex justify-between items-center">
    <h1 className="text-lg font-semibold">Admin Dashboard</h1>
    <button className="bg-[#97c966] text-white px-4 py-2 rounded-md">Logout</button>
  </header>
  <main className="p-6 space-y-6">
    <h2 className="text-xl font-semibold">Manage Users</h2>
    <UsersTable />
    <h2 className="text-xl font-semibold">Upload Questions</h2>
    <UploadQuestions />
    <h2 className="text-xl font-semibold">Create Admin User</h2>
    <CreateAdmin />
  </main>
</div>
    </div>
  );
};

export default AdminDashboard;