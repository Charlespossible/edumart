import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Question {
  id: number;
  question: string;
  optionA: string | null;
  optionB: string | null;
  optionC: string | null;
  optionD: string | null;
  correctAnswer: string | null;
  explanation: string | null;
  questionImageUrl: string | null;
  hasImage: boolean | null;
}

const QuizPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [correctAnswers, setCorrectAnswers] = useState<{ [key: number]: boolean }>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(3600);
  const [score, setScore] = useState<number>(0);
  const [isQuizEnded, setIsQuizEnded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const subjectName = params.get("subjectName");
    const year = params.get("year");

    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/exam/questions", {
          params: { subjectName, year },
        });
        setQuestions(response.data);
      } catch (error) {
        toast.error("Failed to fetch questions.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchQuestions();
  }, [location.search, navigate]);

  const handleAnswerSelect = async (questionId: number, option: string, optionText: string) => {
    try {
      const response = await axios.post("http://localhost:5000/api/exam/validate-answer", {
        questionId,
        userAnswer: optionText,
      });

      setUserAnswers((prev) => ({ ...prev, [questionId]: optionText }));

      if (response.data.isCorrect) {
        setCorrectAnswers((prev) => ({ ...prev, [questionId]: true }));
        setScore((prevScore) => prevScore + 1);
      } else {
        setCorrectAnswers((prev) => ({ ...prev, [questionId]: false }));
      }
    } catch (error) {
      toast.error("Failed to validate answer.");
    }
  };

  const calculateFinalScore = () => {
    setIsQuizEnded(true);
    setTimeRemaining(0);
  };

  const restartQuiz = () => {
    setUserAnswers({});
    setCorrectAnswers({});
    setScore(0);
    setIsQuizEnded(false);
    setTimeRemaining(3600);
  };

  useEffect(() => {
    if (timeRemaining > 0 && !isQuizEnded) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, isQuizEnded]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-6">Take Exam</h1>
      <hr className="border-b-2 border-[#97c966] mt-8 mb-12 w-10 mx-auto"></hr>

      {/* Show loading message while fetching questions */}
      {loading ? (
        <div className="text-center text-lg font-bold">Loading...</div>
      ) : (
        <>
          <div className="sticky top-0 bg-white p-4 shadow-md z-10 text-center font-bold text-lg">
            Time Remaining: {Math.floor(timeRemaining / 60)}:
            {timeRemaining % 60 < 10 ? `0${timeRemaining % 60}` : timeRemaining % 60}
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={question.id} className="bg-white p-4 rounded-lg shadow-md">
                <p className="font-bold">
                  {index + 1}. {correctAnswers[question.id] === false && <span className="text-red-500">❌ </span>}
                  {question.question}
                </p>
                {question.questionImageUrl && (
                  <img
                    src={question.questionImageUrl}
                    alt="Question Image"
                    className="mb-4 rounded-lg"
                  />
                )}
                <div className="mt-2 space-y-2">
                  {["A", "B", "C", "D"].map((option) => {
                    const optionText = question[`option${option}` as keyof Question];
                    return (
                      optionText && (
                        <label
                          key={option}
                          className={`flex items-center ${
                            userAnswers[question.id] === optionText
                              ? correctAnswers[question.id]
                                ? "text-green-600 font-bold"
                                : "text-red-600 font-bold"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option}
                            onChange={() => handleAnswerSelect(question.id, option, String(optionText))}
                            className="mr-2"
                            disabled={!!userAnswers[question.id] || isQuizEnded}
                            checked={userAnswers[question.id] === optionText}
                          />
                          {optionText}
                          {userAnswers[question.id] === optionText &&
                            correctAnswers[question.id] === true && <span className="ml-2">✅</span>}
                        </label>
                      )
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {!isQuizEnded && (
            <div className="mt-6 text-center">
              <button
                onClick={calculateFinalScore}
                className="bg-[#97c966] text-white py-2 px-6 rounded-lg hover:bg-[#78846f]"
              >
                Submit Exam
              </button>
            </div>
          )}

          {isQuizEnded && (
            <div className="mt-6 bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-xl font-bold text-center mb-4">Exam Results</h3>
              <hr className="border-b-2 border-[#97c966] mt-8 mb-12 w-10 mx-auto"></hr>
              <p className="text-center">
                You scored {score} out of {questions.length}.
              </p>
              <div className="mt-4 text-center">
                <button
                  onClick={restartQuiz}
                  className="bg-[#97c966] text-white py-2 px-6 rounded-lg hover:bg-[#97c966]"
                >
                  Take Another Exam
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuizPage;