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
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [location.search, navigate]);

  const handleAnswerSelect = async (questionId: number, option: string, optionText: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/exam/validate-answer",
        { questionId, userAnswer: optionText }
      );

      const isCorrect = response.data.isCorrect;

      setUserAnswers((prev) => ({ ...prev, [questionId]: optionText }));

      const wasCorrect = correctAnswers[questionId];
      if (isCorrect && !wasCorrect) {
        setScore((prevScore) => prevScore + 1);
      } else if (!isCorrect && wasCorrect) {
        setScore((prevScore) => prevScore - 1);
      }

      setCorrectAnswers((prev) => ({ ...prev, [questionId]: isCorrect }));
    } catch (error) {
      toast.error("Failed to validate answer.");
    }
  };

  const submitExamResult = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = userData.id;
      const examId = questions[0]?.id; // Use the first question's ID as a proxy (adjust as needed)

      if (!userId || !examId) {
        throw new Error("Missing user ID or exam ID");
      }

      const resultData = {
        userId,
        examId,
        score,
      };

      await axios.post("http://localhost:5000/api/exam/submit-result", resultData);
      toast.success("Exam result submitted successfully!");
    } catch (error) {
      console.error("Error submitting exam result:", error);
      toast.error("Failed to submit exam result.");
    }
  };

  const handleSubmitExam = () => {
    setIsQuizEnded(true);
    setTimeRemaining(0);
    submitExamResult(); // Submit result when exam ends
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

  // Personalize the Modal with User's Name from localStorage
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = userData.firstName || "User";

  // Calculate Passed, Failed, and Unattempted Questions
  const passed = Object.values(correctAnswers).filter(Boolean).length;
  const attempted = Object.keys(userAnswers).length;
  const failed = attempted - passed;
  const unattempted = questions.length - attempted;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-6">Take Exam</h1>
      <hr className="border-b-2 border-[#97c966] mt-8 mb-12 w-10 mx-auto" />

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
                  {index + 1}. {question.question}
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
                            userAnswers[question.id] === optionText ? "font-bold" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option}
                            onChange={() => handleAnswerSelect(question.id, option, String(optionText))}
                            className="mr-2"
                            disabled={isQuizEnded}
                            checked={userAnswers[question.id] === optionText}
                          />
                          {optionText}
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
                onClick={handleSubmitExam}
                className="bg-[#97c966] text-white py-2 px-6 rounded-lg hover:bg-[#78846f]"
              >
                Submit Exam
              </button>
            </div>
          )}

          {isQuizEnded && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
                <h3 className="text-2xl font-bold text-center mb-4">
                  {firstName}, This is Your Exam Result
                </h3>
                <hr className="border-b-2 border-[#97c966] mb-6" />
                <p className="text-center mb-4">
                  You scored {score} out of {questions.length}.
                </p>
                <p className="text-center mb-4">
                  Passed: {passed} | Failed: {failed} | Unattempted: {unattempted}
                </p>
                <div className="space-y-4">
                  <h4 className="text-lg font-bold">Questions Answered Correctly: {passed}</h4>
                  <ul>
                    {questions
                      .filter((q) => correctAnswers[q.id])
                      .map((q) => (
                        <li key={q.id}>{q.question}</li>
                      ))}
                  </ul>
                  <h4 className="text-lg font-bold">Questions Answered Incorrectly: {failed}</h4>
                  {questions
                    .filter((q) => !correctAnswers[q.id] && userAnswers[q.id])
                    .map((q) => (
                      <div key={q.id} className="p-4 border rounded-lg">
                        <p className="font-bold">{q.question}</p>
                        {q.questionImageUrl && (
                          <img
                            src={q.questionImageUrl}
                            alt="Question Image"
                            className="mb-2 rounded-lg"
                          />
                        )}
                        <p>Your answer: {userAnswers[q.id]}</p>
                        <p>Correct answer: {q.correctAnswer}</p>
                        {q.explanation && <p>Explanation: {q.explanation}</p>}
                      </div>
                    ))}
                  <h4 className="text-lg font-bold">Unattempted Questions: {unattempted}</h4>
                  {questions
                    .filter((q) => !userAnswers[q.id])
                    .map((q) => (
                      <div key={q.id} className="p-4 border rounded-lg">
                        <p className="font-bold">{q.question}</p>
                        {q.questionImageUrl && (
                          <img
                            src={q.questionImageUrl}
                            alt="Question Image"
                            className="mb-2 rounded-lg"
                          />
                        )}
                        <p>Correct answer: {q.correctAnswer}</p>
                        {q.explanation && <p>Explanation: {q.explanation}</p>}
                      </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setIsQuizEnded(false)}
                    className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-700"
                  >
                    Close
                  </button>
                  <button
                    onClick={restartQuiz}
                    className="bg-[#97c966] text-white py-2 px-6 rounded-lg hover:bg-[#78846f]"
                  >
                    Take Another Exam
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuizPage; 