import React, { useState, useEffect } from "react";
import { user } from "../../types/LoginForm";

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<user[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch users from the backend
    fetch("http://localhost:5000/api/admin/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg mb-4"
      />
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="p-3">First Name</th>
            <th className="p-3">last Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone Number</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{user.firstName}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;