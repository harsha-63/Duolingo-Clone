import { useState, useEffect, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { HeartCrack } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { UserStatisticsContext } from "../Context/StaticsticContext";

// Progress Bar Component
// eslint-disable-next-line react/prop-types
const ProgressBar = ({ current, total }) => (
  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
    <div
      className="bg-lime-500 h-full transition-all duration-300"
      style={{ width: `${(current / total) * 100}%` }}
    />
  </div>
);

// Incorrect Answer Modal Component
// eslint-disable-next-line react/prop-types
const IncorrectAnswerModal = ({ onClose, correctAnswer }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header with heart icon */}
        <div className="bg-red-50 p-6 flex flex-col items-center">
          <div className="bg-red-100 rounded-full p-4 mb-4">
            <HeartCrack className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 font-playpen">
            Incorrect
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-600 mb-3 text-center">
              The correct answer was:
            </p>
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <p className="text-green-800 font-medium text-center">
                {correctAnswer}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl transition-colors"
            >
              Got it
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-colors"
            >
              Review lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function LessonPage() {
  const { lessonId } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lessonQuestions, setLessonQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  const { userStats, reduceLife, rewardGems } = useContext(UserStatisticsContext);

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

  const handleCheck = async () => {
    if (isLessonComplete) return;
    setHasChecked(true);
    const isAnswerCorrect = selectedOption === currentQuestion.options[0].text;
    setIsCorrect(isAnswerCorrect);
    
    if (!isAnswerCorrect) {
      try {
        await reduceLife();
        setShowModal(true);
      } catch (error) {
        console.error('Failed to reduce life:', error);
      }
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
      handleNext();
    }
  };

  const handleLessonComplete = async () => {
    try {
      await rewardGems();
    } catch (error) {
      console.error('Failed to reward gems:', error);
    }
  };

  useEffect(() => {
    if (isLessonComplete) {
      handleLessonComplete();
    }
  }, []);

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
        <div>
          <img
            src="https://i.pinimg.com/736x/b8/1b/a9/b81ba98959e0eec1d6512cf8a41cb7cd.jpg"
            alt="Duolingo Character"
            className="w-80 h-auto"
          />
        </div>
        {user ? (
          <>
            <div className="text-3xl font-bold font-playpen text-yellow-400">
              Lesson Complete!
            </div>
            <div className="flex gap-4 mt-2">
              <div className="rounded-lg shadow-lg text-center w-48 h-32 bg-yellow-400 border border-yellow-400">
                <h2 className="text-sm text-gray-200">TOTAL XP</h2>
                <div className="flex justify-center items-center rounded-lg bg-white py-10 mt-2">
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/goals/2b5a211d830a24fab92e291d50f65d1d.svg"
                    alt="xp"
                    className="w-16 h-5"
                  />
                  <p className="text-xl">{user.xp}</p>
                </div>
              </div>
              <div className="rounded-lg shadow-lg text-center w-48 h-32 bg-lime-500 border border-lime-500">
                <h2 className="text-sm text-gray-200">AMAZING</h2>
                <div className="flex justify-center items-center rounded-lg bg-white py-7 mt-2">
                  <p className="text-xl mt-4">100%</p>
                </div>
              </div>
            </div>
          </>
        ) : null}
        <div className="mt-10 border-t border-gray-400 w-full">
          <div className="flex justify-between px-96">
            <button className="mt-6 px-10 py-4 bg-gray-300 text-white rounded-lg text-lg">
              Review Lesson
            </button>
            <NavLink to="/learn">
              <button className="mt-6 px-10 p-4 font-playpen bg-lime-500 text-white rounded-lg text-lg">
                Continue
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <div className="mb-4 px-96 mt-10">
        <div className="flex items-center justify-between mb-4">
          <button className="p-3 hover:bg-gray-100 rounded-full">
            <FaTimes className="text-2xl text-gray-500 cursor-pointer" />
          </button>
          <ProgressBar
            current={currentQuestionIndex}
            total={lessonQuestions.length}
          />
          <div className="flex items-center gap-2 ml-2">
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8fdba477c56a8eeb23f0f7e67fdec6d9.svg"
              alt="Heart Icon"
              className="w-8 h-8"
            />
            <span className="font-bold text-xl">{userStats.life}</span>
          </div>
        </div>
      </div>
      <div className="mb-10 px-96 font-playpen">
        <div className="text-3xl text-gray-800 mb-3 px-20">
          {currentQuestion.questionType}
        </div>
        <p className="text-xl px-20 mb-3">{currentQuestion.question}</p>
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
              className="px-6 py-3 bg-lime-500 text-white font-semibold rounded-lg hover:bg-lime-600"
            >
              Continue
            </button>
          )}
        </div>
      </div>
      {showModal && (
        <IncorrectAnswerModal
          onClose={closeModal}
          correctAnswer={currentQuestion.options[0].text}
        />
      )}
    </div>
  );
}

export default LessonPage;






