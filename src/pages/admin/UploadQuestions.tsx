import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const UploadQuestions: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadTrigger, setUploadTrigger] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }
    setUploadTrigger(true); // Trigger upload
  };

  useEffect(() => {
    if (!uploadTrigger || !file) return;

    const uploadFile = async () => {
      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          "http://localhost:5000/api/admin/upload-questions",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.status === 200) {
          toast.success("Questions uploaded successfully!");
        } else {
          toast.error(response.data.message || "Failed to upload questions.");
        }
      } catch (error: any) {
        console.error("Error uploading questions:", error);
        toast.error(
          error.response?.data?.message || "An error occurred while uploading."
        );
      } finally {
        setIsUploading(false);
        setUploadTrigger(false);
      }
    };

    uploadFile();
  }, [uploadTrigger, file]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="file" className="block text-[#78846f] mb-2">
            Upload Excel or CSV File
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileChange}
            className="w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#97c966]"
            required
          />
        </div>
        <button
          type="submit"
          className="w-auto px-4 py-2 font-bold text-white bg-[#97c966] rounded-lg hover:bg-[#97c966] focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Questions"}
        </button>
      </form>
    </>
  );
};

export default UploadQuestions;
