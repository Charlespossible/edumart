import React, { useState, useEffect } from "react";
import { IREGISTER, RegistrationFormProps } from "../types/RegistrationForm";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationForm: React.FC<RegistrationFormProps> = () => {
  const [formData, setFormData] = useState<IREGISTER>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    referer: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefererDisabled, setIsRefererDisabled] = useState(false); // New state for disabling referer field
  const navigate = useNavigate();
  const location = useLocation(); // Hook to access URL query parameters

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Check for referral query parameter on mount
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const refEmail = queryParams.get("ref");
    if (refEmail) {
      setFormData((prev) => ({ ...prev, referer: refEmail }));
      setIsRefererDisabled(true); // Disable the referer field
    }
  }, [location.search]);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email";

    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
  };

  // Handle the API call
  useEffect(() => {
    if (isSubmitting) {
      const registerUser = async () => {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/auth/register",
            formData
          );
          toast.success(response.data.message || "Registration successful!");
          localStorage.setItem("email", formData.email); // Store email for OTP verification
          setTimeout(() => navigate("/otp-verification"), 3000); // Redirect to OTP page
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Registration failed");
        } finally {
          setIsSubmitting(false);
        }
      };

      registerUser();
    }
  }, [isSubmitting, formData, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 sm:p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-[#97c966] mb-6">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4" aria-label="Registration Form">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-[#78846f] mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#97c966]"
              required
              aria-required="true"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-[#78846f] mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#97c966]"
              required
              aria-required="true"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-[#78846f] mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#97c966]"
              required
              aria-required="true"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-[#78846f] mb-2">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#97c966]"
              required
              aria-required="true"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Referer */}
          <div>
            <label htmlFor="referer" className="block text-[#78846f] mb-2">
              Referer
            </label>
            <input
              type="text"
              id="referer"
              name="referer"
              value={formData.referer}
              onChange={handleChange}
              placeholder="Who referred you"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#97c966] disabled:bg-gray-100"
              disabled={isRefererDisabled} // Disable when referral link is used
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-[#78846f] mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#97c966]"
              required
              aria-required="true"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-[#78846f] mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#97c966]"
              required
              aria-required="true"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-[#97c966] rounded-lg hover:bg-[#97c966] focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <p className="text-center text-[#78846f] mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#97c966] hover:underline">
            Login
          </a>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={6000} />
    </div>
  );
};

export default RegistrationForm;