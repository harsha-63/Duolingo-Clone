import { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { UserStatisticsContext } from "../Context/StaticsticContext";
import IncorrectAnswerModal from "../Modal/IncorrectAnswer";
import ZeroLivesModal from "../Modal/ZeroLife";
import { LessonContext } from "../Context/LessonContext";

// eslint-disable-next-line react/prop-types
const ProgressBar = ({ current, total }) => (
  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
    <div
      className="bg-lime-500 h-full transition-all duration-300"
      style={{ width: `${(current / total) * 100}%` }}
    />
  </div>
);

function LessonPage() {
  const { lessonId } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const saved = localStorage.getItem(`lesson_${lessonId}_progress`);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [lessonQuestions, setLessonQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showZeroLivesModal, setShowZeroLivesModal] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { userStats, reduceLife, refillLife, rewardGems } = useContext(UserStatisticsContext);
  const {completeLesson} = useContext(LessonContext)
  const fetchLessonQuestions = useCallback(async () => {
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
  }, [lessonId]);

  useEffect(() => {
    if (lessonId && lessonId !== "undefined") {
      fetchLessonQuestions();
    }
  }, [lessonId, fetchLessonQuestions]);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(`lesson_${lessonId}_progress`, currentQuestionIndex.toString());
  }, [currentQuestionIndex, lessonId]);

  const handleRestoreLives = async () => {
    if (userStats.life > 0) return;
    
    try {
      await refillLife();
      setShowZeroLivesModal(false);
    } catch (error) {
      alert.error('Failed to refill lives:', error);
    }
  };

  const handleReturnHome = () => {
    localStorage.removeItem(`lesson_${lessonId}_progress`);
    navigate('/learn');
  };
  useEffect(() => {
    if (userStats !== undefined) {
      setIsStatsLoading(false);
    }
  }, [userStats]);

  const currentQuestion = lessonQuestions[currentQuestionIndex];
  const isLessonComplete = currentQuestionIndex >= lessonQuestions.length;

  const handleOptionSelect = (option) => {
    if (!hasChecked) {
      setSelectedOption(option);
    }
  };

  const handleCheck = async () => {
    if (!selectedOption || isLessonComplete) return;
    
    setHasChecked(true);
    const isAnswerCorrect = selectedOption === currentQuestion.options[0].text;
    setIsCorrect(isAnswerCorrect);
    
    if (!isAnswerCorrect) {
      try {
        await reduceLife();
        if (userStats.life <= 1) {
          setShowZeroLivesModal(true);
        } else {
          setShowModal(true);
        }
      } catch (error) {
        console.error('Failed to reduce life:', error);
        setShowModal(true);
      }
    }
  };

  const handleNext = () => {
    if (!isLessonComplete) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption("");
      setHasChecked(false);
      setIsCorrect(false);
      setShowModal(false);
      
      // Check if this was the last question
      if (nextIndex === lessonQuestions.length) {
        setLessonCompleted(true);
      }
    }
  };

  const handleSkip = () => {
    if (!isLessonComplete) {
      handleNext();
    }
  };

  const handleLessonComplete = useCallback(async () => {
    if (!lessonCompleted) return;
    
    try {
      await rewardGems();
      await completeLesson(lessonId);
      localStorage.removeItem(`lesson_${lessonId}_progress`);
    } catch (error) {
      console.error('Failed to reward gems:', error);
    }
  }, [rewardGems, lessonCompleted, lessonId,completeLesson]);

  useEffect(() => {
    if (lessonCompleted) {
      handleLessonComplete();
    }
  }, [lessonCompleted, handleLessonComplete]);

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
                  <p className="text-xl">{user.xpPoints}</p>
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
            <button 
              onClick={handleReturnHome}
              className="mt-6 px-10 p-4 font-playpen bg-lime-500 text-white rounded-lg text-lg"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-full">
    {/* Header Section */}
    <div className="mb-4 px-4 md:px-24 lg:px-96 mt-10">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={handleReturnHome}
          className="p-3 hover:bg-gray-100 rounded-full"
        >
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
          <span className="font-bold text-red-400 text-lg">
            {isStatsLoading ? (
              <span className="animate-pulse">...</span>
            ) : (
              userStats.life
            )}
          </span>
        </div>
      </div>
    </div>

    {/* Question Section */}
    <div className="mb-10 px-4 md:px-24 lg:px-96 font-playpen">
      <div className="text-3xl text-gray-800 mb-3 md:px-10 lg:px-20">
        {currentQuestion.questionType}
      </div>
      <p className="text-xl md:px-10 lg:px-20 mb-3">
        {currentQuestion.question}
      </p>
      <h2 className="text-lg font-bold mb-6 md:px-10 lg:px-20">
        {currentQuestion.questionText}
      </h2>
      <div className="space-y-4 md:px-10 lg:px-20">
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

    {/* Footer Section */}
    <div className="border-t border-gray-400 pt-6 w-full">
      <div className="flex justify-between px-4 md:px-24 lg:px-96">
        <button
          onClick={handleSkip}
          className={`px-6 md:px-10 py-3 text-gray-500 font-semibold hover:bg-gray-100 rounded-lg ${
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
            className={`px-6 md:px-10 py-3 rounded-lg font-semibold transition-all ${
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
            className="px-6 md:px-10 py-3 bg-lime-500 text-white font-semibold rounded-lg hover:bg-lime-600"
          >
            Continue
          </button>
        )}
      </div>
    </div>

    {/* Modals remain the same */}
    {showModal && (
      <IncorrectAnswerModal
        onClose={closeModal}
        correctAnswer={currentQuestion.options[0].text}
      />
    )}
    {showZeroLivesModal && (
      <ZeroLivesModal 
        onRestoreLives={handleRestoreLives}
        onReturnHome={handleReturnHome}
      />
    )}
  </div>
);
}
export default LessonPage


