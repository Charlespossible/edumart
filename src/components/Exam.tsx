import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Exam {
  name: string;
  subjects: string[];
}

const exams: Exam[] = [
  { name: "WAEC", subjects: ["English", "Mathematics", "Biology", "Physics", "Agric", "Chemistry", "Economics"] },
  { name: "JAMB", subjects: ["English", "Mathematics", "Biology", "Physics", "Agric", "Chemistry", "Economics"] },
  { name: "NECO", subjects: ["English", "Mathematics", "Biology", "Physics", "Agric", "Chemistry", "Economics"] },
  { name: "GCE", subjects: ["English", "Mathematics", "Biology", "Physics", "Agric", "Chemistry", "Economics"] },
  { name: "NABTEB", subjects: ["English", "Mathematics", "Biology", "Physics", "Agric", "Chemistry", "Economics"] },
];

const Exam: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedYears, setSelectedYears] = useState<number[]>([]); 
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); 

  const handleExamClick = (examName: string) => {
    setSelectedExam(examName === selectedExam ? null : examName);
    setSelectedSubject(null); 
    setSelectedYears([]); 
  };

  const handleSubjectClick = (subject: string) => {
    setSelectedSubject(subject);
    setSelectedYears(Array.from({ length: 39 }, (_, i) => 1982 + i));
  };

  const handleYearClick = (year: number) => {
    if (!isAuthenticated) {
      toast.error("You must log in to access this content!");
      return;
    }
    toast.success(`Accessing content for ${selectedSubject} ${year}`);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    toast.success("You are now logged in!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-6">Choose Your Exam</h1>
      <hr className="border-b-2 border-[#97c966] mt-8 mb-12 w-10 mx-auto"></hr>

      {/* Exams */}
      <div className="flex flex-wrap justify-center gap-4">
        {exams.map((exam) => (
          <div
            key={exam.name}
            className={`bg-[#97c966] text-white py-4 px-6 rounded-lg cursor-pointer hover:bg-[#78846f] ${
              selectedExam === exam.name ? "bg-[#97c966]" : ""
            }`}
            onClick={() => handleExamClick(exam.name)}
          >
            {exam.name}
          </div>
        ))}
      </div>

      {/* Subjects Dropdown */}
      {selectedExam && (
        <div className="mt-6 bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold text-center mb-4">
            Subjects for {selectedExam}
          </h2>
          <hr className="border-b-2 border-[#97c966] mt-8 mb-12 w-10 mx-auto"></hr>
          <div className="flex flex-wrap justify-center gap-4">
            {exams
              .find((exam) => exam.name === selectedExam)
              ?.subjects.map((subject) => (
                <div
                  key={subject}
                  className={`bg-gray-200 text-gray-800 py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-300 ${
                    selectedSubject === subject ? "bg-gray-400" : ""
                  }`}
                  onClick={() => handleSubjectClick(subject)}
                >
                  {subject}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Past Questions */}
      {selectedSubject && selectedYears.length > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-xl font-bold text-center mb-4">
            {selectedSubject} Past Questions
          </h3>
          <hr className="border-b-2 border-[#97c966] mt-8 mb-12 w-10 mx-auto"></hr>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {selectedYears.map((year) => (
              <div
                key={year}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-center cursor-pointer hover:bg-gray-300"
                onClick={() => handleYearClick(year)}
              >
                {`${selectedSubject} ${year}`}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-6">
        <hr className="border-b-2 border-[#97c966] mt-8 mb-16 w-96 mx-auto"></hr>
      </div>

      {/* Login Button */}
      {!isAuthenticated && (
        <div className="mt-6 flex justify-center">
          <button
            className="bg-[#97c966] text-white py-2 px-6 rounded-lg hover:bg-[#78846f]"
            onClick={handleLogin}
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default Exam;
