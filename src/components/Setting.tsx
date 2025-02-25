import React, { useState, useEffect } from "react";
import axios from "axios";

const Settings: React.FC = () => {
  // State for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const BASE_URL = "http://localhost:5000";
      
        const userId = 1; // Replace with the actual user ID (e.g., from authentication context)
        const response = await axios.get(`${BASE_URL}api/auth/getUser/${userId}`);
        const { firstName, lastName, phone } = response.data;
        setFirstName(firstName);
        setLastName(lastName);
        setPhone(phone || ""); // Handle null phone number
      } catch (error) {
        setMessage("Failed to fetch user details. Please try again.");
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  // Handle form submission
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const userId = 1; // Replace with the actual user ID (e.g., from authentication context)
      const response = await axios.put(`http://localhost:5000/api/auth/settings/${userId}`, {
        firstName,
        lastName,
        phone,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Failed to update settings. Please try again.");
      console.error("Error updating settings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      
      <form onSubmit={handleSave} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#97c966] text-white px-4 py-2 rounded hover:bg-[#85b35c] transition-colors"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

        {/* Message */}
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </form>
    </div>
  );
};

export default Settings;