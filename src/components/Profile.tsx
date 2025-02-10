import React from "react";

const Profile: React.FC = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
      <div className="space-y-4">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> johndoe@example.com</p>
        <p><strong>Enrolled Since:</strong> January 2024</p>
      </div>
    </div>
  );
};

export default Profile;