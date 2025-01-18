import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import {  AlertTriangle } from "lucide-react"; 
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

// eslint-disable-next-line react/prop-types
const ProgressBar = ({ current, total }) => (
  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
    <div
      className="bg-blue-500 h-full transition-all duration-300"
      style={{ width: `${(current / total) * 100}%` }}
    />
  </div>
);

// Modal for Incorrect Answer
// eslint-disable-next-line react/prop-types
const ErrorModal = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <AlertTriangle size={50} className="text-yellow-500 mx-auto mb-4" />
      <h2 className="text-xl text-gray-800 mb-4">Incorrect Answer</h2>
      <p className="text-gray-600">Try again, you can do it!</p>
      <button
        onClick={onClose}
        className="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Close
      </button>
    </div>
  </div>
);

function LessonPage() {
  const { lessonId } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lessonQuestions, setLessonQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lives, setLives] = useState(5);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchLessonQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:4000/user/lesson/${lessonId}/questions`
        );
        setLessonQuestions(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load lesson questions");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (lessonId && lessonId !== "undefined") {
      fetchLessonQuestions();
    }
  }, [lessonId]);

  const currentQuestion = lessonQuestions[currentQuestionIndex];
  const isLessonComplete = currentQuestionIndex >= lessonQuestions.length;

  const handleOptionSelect = (option) => {
    if (!hasChecked) {
      setSelectedOption(option);
    }
  };

  const handleCheck = () => {
    if (isLessonComplete) return;
    setHasChecked(true);
    const isAnswerCorrect = selectedOption === currentQuestion.options[0].text;
    setIsCorrect(isAnswerCorrect);
    if (!isAnswerCorrect) {
      setLives((prev) => Math.max(0, prev - 1));
      setShowModal(true);
    }
  };

  const handleNext = () => {
    if (!isLessonComplete) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption("");
      setHasChecked(false);
      setIsCorrect(false);
    }
  };

  const handleSkip = () => {
    if (!isLessonComplete) {
      setLives((prev) => Math.max(0, prev - 1));
      handleNext();
    }
  };

  const closeModal = () => setShowModal(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (isLessonComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-4xl font-bold ">Lesson Completed!</div>
        <div className="flex gap-4 mt-44 ">
          <div className="bg-green-100 p-6 rounded-lg shadow-lg text-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Duolingo Character"
              className="mx-auto mb-4"
            />
            <p className="text-xl">Great job completing the lesson!</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg text-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Duolingo Character 2"
              className="mx-auto mb-4"
            />
            <p className="text-xl">Review your progress anytime.</p>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-400  w-full ">
          <div className="flex justify-between px-96">
        <button
          className="mt-6 px-10 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Review Lesson
        </button>
        <button className="mt-6 px-10 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600">continue, </button>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" mx-auto">
      <div className="mb-4 px-96 mt-10">
        <div className="flex items-center justify-between mb-4">
          <button className="p-3 hover:bg-gray-100 rounded-full">
            <FaTimes className="text-2xl text-gray-500 cursor-pointer" />
          </button>
          <ProgressBar
            current={currentQuestionIndex + 1}
            total={lessonQuestions.length}
          />
          <div className="flex items-center gap-2 ml-2">
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8fdba477c56a8eeb23f0f7e67fdec6d9.svg"
              alt="Heart Icon"
              className="w-8 h-8"
            />
            <span className="font-bold text-xl">
              {user && user.life !== undefined ? user.life : lives}
            </span>
          </div>
        </div>
      </div>
      <div className="mb-10 px-96 font-playpen">
        <div className="text-3xl text-gray-800 mb-3 px-20">
          {currentQuestion.questionType}
        </div>
        <p className="text-xl px-20 mb-3 ">{currentQuestion.question}</p>
        <h2 className="text-lg font-bold mb-6 px-20">
          {currentQuestion.questionText}
        </h2>
        <div className="space-y-4 px-20">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option.text)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                selectedOption === option.text
                  ? hasChecked
                    ? isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              disabled={hasChecked}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-400 pt-6 w-full">
        <div className="flex justify-between px-96">
          <button
            onClick={handleSkip}
            className={`px-10 py-3 text-gray-500 font-semibold hover:bg-gray-100 rounded-lg ${
              isLessonComplete ? "bg-gray-300" : "bg-gray-200"
            }`}
            disabled={isLessonComplete}
          >
            {isLessonComplete ? "Review Lesson" : "Skip"}
          </button>
          {!hasChecked && (
            <button
              onClick={handleCheck}
              disabled={!selectedOption}
              className={`px-10 py-3 rounded-lg font-semibold transition-all ${
                selectedOption
                  ? "bg-lime-500 text-white hover:bg-lime-600"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              Check
            </button>
          )}
          {hasChecked && !isLessonComplete && (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
            >
              Continue
            </button>
          )}
        </div>
      </div>
      {showModal && <ErrorModal onClose={closeModal} />}
    </div>
  );
}

export default LessonPage;






