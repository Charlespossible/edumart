import React, { useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadQuestions: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    setIsUploading(true);

    try {
      // Read the Excel file
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0]; // Assuming the first sheet contains the data
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          // Validate the data
          if (!Array.isArray(jsonData) || jsonData.length === 0) {
            toast.error("The file is empty or invalid.");
            return;
          }

          // Send the data to the backend
          const response = await fetch("http://localhost:5000/api/admin/upload-questions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData),
          });

          if (response.ok) {
            toast.success("Questions uploaded successfully!");
          } else {
            toast.error("Failed to upload questions.");
          }
        }
      };
      reader.readAsBinaryString(file);
    } catch (error) {
      console.error("Error uploading questions:", error);
      toast.error("An error occurred while uploading questions.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="file" className="block text-[#78846f] mb-2">
          Upload Excel File
        </label>
        <input
          type="file"
          id="file"
          accept=".xlsx, .xls"
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
  );
};

export default UploadQuestions;