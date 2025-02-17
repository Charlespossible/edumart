import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      toast.success(response.data.message);
      setTimeout(() => navigate("/login"), 3000); 
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-[#97c966] mb-6">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-[#78846f] mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-[#97c966]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[#97c966] rounded-lg hover:bg-green-700 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <p className="text-center text-[#78846f] mt-4">
          Remember your password? <a href="/login" className="text-[#97c966] hover:underline">Login</a>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default ForgotPassword;