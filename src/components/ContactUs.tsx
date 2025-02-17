import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/contact   ", formData);
      toast.success(response.data.message); // Show success toast
      setFormData({ name: "", email: "", message: "" }); // Reset the form
    } catch (error) {
      toast.error("Failed to send message. Please try again."); // Show error toast
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Centered Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        Contact Us
      </h1>
      <hr className="border-b-2 border-[#97c966] mt-2 mb-10 w-2/12 mx-auto" ></hr>

      {/* Contact Rows */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-10">
        {/* Phone Numbers */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Phone Numbers</h2>
          <hr className="border-b-2 border-[#97c966] mt-2 mb-5 w-4 mx-auto" ></hr>
          <p className="text-gray-600">+234 080 456 7890</p>
          <p className="text-gray-600">+234 090 7946 0958</p>
        </div>

        {/* Email */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Email</h2>
          <hr className="border-b-2 border-[#97c966] mt-2 mb-5 w-4 mx-auto" ></hr>
          <p className="text-gray-600">contact@edumart.com</p>
          <p className="text-gray-600">support@edumart.com</p>
        </div>

        {/* Social Media Handles */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Social Media</h2>
          <hr className="border-b-2 border-[#97c966] mt-2 mb-5 w-4 mx-auto" ></hr>
          <p className="text-gray-600">@Edumart (Twitter)</p>
          <p className="text-gray-600">/Edumart (Facebook)</p>
          <p className="text-gray-600">@Edumart (Instagram)</p>
        </div>
      </div>

      <hr className="border-b-2 border-[#97c966] mt-2 mb-10 w-96 mx-auto" ></hr>

      {/* Contact Form */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          We would love to hear from you.
        </h3>
        <hr className="border-b-2 border-[#97c966] mt-2 mb-5 w-10 mx-auto" ></hr>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-gray-600 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#97c966] focus:ring-[#97c966]"
              placeholder="Your Name"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#97c966] focus:ring-[#97c966]"
              placeholder="Your Email"
              required
            />
          </div>

          {/* Message TextArea */}
          <div>
            <label htmlFor="message" className="block text-gray-600 font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#97c966] focus:ring-[#97c966]"
              rows={4}
              placeholder="Your Message"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#97c966] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#97c966] transition duration-300 disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ContactUs;