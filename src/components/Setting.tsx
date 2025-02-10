import React, { useState } from "react";

const Settings: React.FC = () => {
  // State for form inputs
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // Handle form submission
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings updated successfully!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      
      <form onSubmit={handleSave} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="mr-2"
          />
          <label className="text-gray-700">Enable Dark Mode</label>
        </div>

        {/* Notification Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="mr-2"
          />
          <label className="text-gray-700">Receive Email Notifications</label>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-[#97c966] text-white px-4 py-2 rounded hover:bg-[#97c966]"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
