import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Exam {
  id: number;
  questionsGroupId: string;
  subjectName: string;
  examType: string;
}

const ExamSelection: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const navigate = useNavigate();

  // Fetch exams on component mount
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/exam/exam-types");
        setExams(response.data);
      } catch (error) {
        toast.error("Failed to fetch exams types.");
      }
    };
    fetchExams();
  }, []);

  // Fetch subjects when exam is selected
  useEffect(() => {
    if (selectedExam) {
      const fetchSubjects = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/exam/subjects");
          setSubjects(response.data);
        } catch (error) {
          toast.error("Failed to fetch subjects.");
        }
      };
      fetchSubjects();
    }
  }, [selectedExam]);

  // Fetch years when subject is selected
  useEffect(() => {
    if (selectedSubject) {
      const fetchYears = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/exam/years?subjectName=${selectedSubject}`);
          console.log(response.data) ;
          setYears(response.data);
        } catch (error) {
          toast.error("Failed to fetch years.");
        }
      };
      fetchYears();
    }
  }, [selectedSubject]);

  // Handle exam selection
  const handleExamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedExam(e.target.value);
    setSelectedSubject("");
    setSelectedYear(null);
  };

  // Handle subject selection
  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value);
    setSelectedYear(null);
  };

  // Handle year selection
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(e.target.value));
  };

  // Start the quiz
  const startQuiz = () => {
    if (!selectedExam || !selectedSubject || !selectedYear) {
      toast.error("Please select an exam, subject, and year.");
      return;
    }
    navigate(`/quiz?subjectName=${selectedSubject}&year=${selectedYear}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-6">Select Your Exam</h1>
      <hr className="border-b-2 border-[#97c966] mt-8 mb-12 w-10 mx-auto"></hr>

      {/* Exam Dropdown */}
      <div className="mb-6">
        <label className="block text-gray-700">Exam Type</label>
        <select
          value={selectedExam}
          onChange={handleExamChange}
          className="w-full p-2 border rounded-lg"
        >

          <option value="">Select Exam</option>
          {exams.map((exam) => (
            <option key={exam.id} value={exam.examType}>
              {exam.examType}
            </option>
          ))}
        </select>
      </div>

      {/* Subject Dropdown */}
      {selectedExam && (
        <div className="mb-6">
          <label className="block text-gray-700">Subject</label>
          <select
            value={selectedSubject}
            onChange={handleSubjectChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Year Dropdown */}
      {selectedSubject && (
        <div className="mb-6">
          <label className="block text-gray-700">Year</label>
          <select
            value={selectedYear || ""}
            onChange={handleYearChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Start Quiz Button */}
      <div className="mt-6">
        <button
          onClick={startQuiz}
          className="bg-[#97c966] text-white py-2 px-6 rounded-lg hover:bg-[#78846f]"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default ExamSelection;