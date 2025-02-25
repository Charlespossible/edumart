import React from "react";
import { useNavigate } from "react-router-dom";

const AboutExam: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = false; // Replace with actual authentication logic

  const exams = [
    { name: "WAEC", description: "West African Examination Council" },
    { name: "JAMB", description: "Joint Admissions and Matriculation Board" },
    { name: "NABTEB", description: "National Business and Technical Examinations Board" },
    { name: "NECO", description: "National Examinations Council" },
    { name: "JUNIOR WAEC", description: "Basic Education Certificate Examination" },
    { name: "COMMON ENTRANCE", description: "Entrance Examination for Secondary Schools" },
    { name: "CBT EXAMS", description: "Computer-Based Tests for Various Exams" },
  ];

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Explore Our Exams
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {exam.name}
              </h2>
              <p className="text-gray-600">{exam.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <button
            onClick={handleGetStarted}
            className="bg-[#97c966] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#97c966] transition-colors duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutExam;