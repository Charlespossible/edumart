import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OTPVerificationPage: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    //const storedName = localStorage.getItem("firstName");
    console.log(storedEmail);
    if (!storedEmail) {
      navigate("/register");
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await axios.put("http://localhost:5000/api/auth/verifyOTP", { email, otp });
      toast.success(response.data.message || "OTP verified successfully!");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 sm:p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-[#97c966] mb-6">
          OTP Verification
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-[#78846f] mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#97c966]"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-[#97c966] rounded-lg hover:bg-[#97c966] focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerificationPage;