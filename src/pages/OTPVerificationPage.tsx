import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OTPVerificationPage: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Ensure only numeric input and limit to 6 digits
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits long", { autoClose: 6000 });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate OTP verification API call
      const response = await verifyOTP(otp); // Replace with your actual API call
      if (response.success) {
        toast.success("OTP verified successfully! Redirecting to dashboard...");
        setTimeout(() => navigate("/dashboard"), 3000); // Redirect after 2 seconds
      } else {
        toast.error("Invalid OTP. Please try again.", { autoClose: 6000 });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { autoClose: 6000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simulated OTP verification function (replace with actual API call)
  const verifyOTP = async (otp: string): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate a valid OTP (e.g., "123456")
        resolve({ success: otp === "123456" });
      }, 1000);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 sm:p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-[#97c966] mb-6">
          OTP Verification
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4" aria-label="OTP Verification Form">
          <div>
            <label htmlFor="otp" className="block text-[#78846f] mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleChange}
              placeholder="Enter 6-digit OTP"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#97c966]"
              maxLength={6}
              required
              aria-required="true"
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

        <p className="text-center text-[#78846f] mt-4">
          Didn't receive the OTP?{" "}
          <button
            onClick={() => toast.info("OTP resent! Check your email.", { autoClose: 3000 })}
            className="text-[#97c966] hover:underline focus:outline-none"
          >
            Resend OTP
          </button>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={6000} />
    </div>
  );
};

export default OTPVerificationPage;