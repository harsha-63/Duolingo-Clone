import { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { UserStatisticsContext } from "../Context/StaticsticContext";
import IncorrectAnswerModal from "../Modal/IncorrectAnswer";
import ZeroLivesModal from "../Modal/ZeroLife";
import LackOfGemsModal from "../Modal/LackofGems";
import CloseLessonModal from "../Modal/CloseModal";
import { LessonContext } from "../Context/LessonContext";
import TextQuestion from "../Components/QuestionComponents/TextQues";
import AudioQuestion from "../Components/QuestionComponents/AudioQues";


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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [lessonQuestions, setLessonQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showZeroLivesModal, setShowZeroLivesModal] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { userStats, reduceLife, refillLife, rewardGems,xpPoints } = useContext(UserStatisticsContext);
  const { completeLesson } = useContext(LessonContext);

  const fetchLessonQuestions = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:4000/user/lesson/${lessonId}/questions`
      );
      setLessonQuestions(response.data);
      
      if (response.data.length > 0) {
        const firstQuestion = await axios.get(
          `http://localhost:4000/user/question/${response.data[0].id}?isText=${response.data[0].isText}`
        );
        setCurrentQuestion(firstQuestion.data);
      }
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

  useEffect(() => {
    localStorage.setItem(`lesson_${lessonId}_progress`, currentQuestionIndex.toString());
  }, [currentQuestionIndex, lessonId]);

  const fetchQuestionData = async (questionId, isText) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/user/question/${questionId}?isText=${isText}`
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch question:', error);
      throw error;
    }
  };

  const handleClose = () => {
   setShowCloseModal(true)
  };
    

  const handleRestoreLives = async () => {
    if (userStats.life > 0) return;
    
    try {
      if(userStats.gems < 350){
        setIsVisible(true);
        setShowZeroLivesModal(false);
      }
      else{
      await refillLife();
      setShowZeroLivesModal(false);
      }
    } catch (error) {
      console.error('Failed to refill lives:', error);
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

  useEffect(() => {
    if (lessonQuestions.length > 0 && currentQuestionIndex >= lessonQuestions.length) {
      setLessonCompleted(true);
    }
  }, [lessonQuestions, currentQuestionIndex]);
  


  const handleOptionSelect = (option) => {
    if (!hasChecked) {
      setSelectedOption(option);
    }
  };


  const handleCheck = async () => {
    if (!selectedOption || lessonCompleted) return;
  
    setHasChecked(true);
  
    let isAnswerCorrect;
  
    if (currentQuestion.isText) {
      isAnswerCorrect = selectedOption === currentQuestion.options[0].text;
    } else {
      isAnswerCorrect = selectedOption.trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase();
      console.log(selectedOption.trim().toLowerCase());
      console.log(currentQuestion.correctAnswer.trim().toLowerCase());
      
      console.log(isAnswerCorrect);
    }
  
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
  
  

  const handleNext = async () => {
    if (currentQuestionIndex < lessonQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      try {
        const nextQuestion = await fetchQuestionData(
          lessonQuestions[nextIndex].id,
          lessonQuestions[nextIndex].isText
        );
        setCurrentQuestionIndex(nextIndex);
        setCurrentQuestion(nextQuestion);
        setSelectedOption("");
        setHasChecked(false);
        setIsCorrect(false);
        setShowModal(false);
      } catch (error) {
        console.log(error);
        
        setError("Failed to load next question");
      }
    } else {
      setLessonCompleted(true);
    }
  };

  const handleSkip = () => {
    if (!lessonCompleted) {
      handleNext();
    }
  };

  const handleLessonComplete = useCallback(async () => {
    if (!lessonCompleted) return;
    
    try {
      await xpPoints()
      await rewardGems();
      await completeLesson(lessonId);
      localStorage.removeItem(`lesson_${lessonId}_progress`);
    } catch (error) {
      console.error('Failed to reward gems:', error);
    }
  }, [rewardGems, lessonCompleted, lessonId, completeLesson,xpPoints]);

  useEffect(() => {
    if (lessonCompleted) {
      handleLessonComplete();
    }
  }, [lessonCompleted, handleLessonComplete]);

  const closeModal = () => setShowModal(false);

  const handleKeepLearning = () => {
    setShowCloseModal(false);
  };

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

  if (lessonCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div>
          <img
            src="https://i.pinimg.com/736x/b8/1b/a9/b81ba98959e0eec1d6512cf8a41cb7cd.jpg"
            alt="Duolingo Character"
            className="w-40 sm:w-60 md:w-80 h-auto"
          />
        </div>
        {user ? (
          <>
            <div className="text-2xl sm:text-3xl font-bold font-playpen text-yellow-400 text-center">
              Lesson Complete!
            </div>
            <div className="flex gap-4 mt-2">
              <div className="rounded-lg shadow-lg text-center w-32 h-28 sm:w-48 sm:h-32 bg-yellow-400 border border-yellow-400">
                <h2 className="text-xs sm:text-sm text-gray-200">TOTAL XP</h2>
                <div className="flex justify-center items-center rounded-lg bg-white py-5 sm:py-10 mt-2">
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/goals/2b5a211d830a24fab92e291d50f65d1d.svg"
                    alt="xp"
                    className="w-20 sm:w-16 h-6 sm:h-5"
                  />
                  <p className="text-lg sm:text-xl">{userStats.xpPoints}</p>
                </div>
              </div>
              <div className="rounded-lg shadow-lg text-center w-32 h-28 sm:w-48 sm:h-32 bg-lime-500 border border-lime-500">
                <h2 className="text-xs sm:text-sm text-gray-200">AMAZING</h2>
                <div className="flex justify-center items-center rounded-lg bg-white py-5 sm:py-7 mt-2">
                  <p className="text-lg sm:text-xl mt-3 sm:mt-4">100%</p>
                </div>
              </div>
            </div>
          </>
        ) : null}
        <div className="mt-10 border-t border-gray-400 w-full">
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between gap-4 px-6 sm:px-20 lg:px-96">
            <button className="mt-6 px-6 sm:px-10 py-3 sm:py-4 bg-gray-300 text-white rounded-lg text-base sm:text-lg">
              Review Lesson
            </button>
            <button
              onClick={handleReturnHome}
              className="mt-6 px-6 sm:px-10 py-3 sm:py-4 font-playpen bg-lime-500 text-white rounded-lg text-base sm:text-lg"
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
      <div className="mb-4 px-4  lg:px-96 mt-10">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={handleClose}
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
      <div>
        {currentQuestion.isText ? (
          
          <TextQuestion
            currentQuestion={currentQuestion}
            selectedOption={selectedOption}
            hasChecked={hasChecked}
            isCorrect={isCorrect}
            onOptionSelect={handleOptionSelect}
          />
        ) : (
          <AudioQuestion
            currentQuestion={currentQuestion}
            hasChecked={hasChecked}
            isCorrect={isCorrect}
            onOptionSelect={handleOptionSelect}
           />        
        )}
        
      </div>

      <div className="border-t border-gray-400 pt-6 w-full">
        <div className="flex justify-between px-4 md:px-24 lg:px-96">
          <button
            onClick={handleSkip}
            className={`px-6 md:px-10 py-3 text-gray-500 font-semibold hover:bg-gray-100 rounded-lg ${
              lessonCompleted ? "bg-gray-300" : "bg-gray-200"
            }`}
            disabled={lessonCompleted}
          >
            {lessonCompleted ? "Review Lesson" : "Skip"}
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
          {hasChecked && !lessonCompleted && (
            <button
              onClick={handleNext}
              className="px-6 md:px-10 py-3 bg-lime-500 text-white font-semibold rounded-lg hover:bg-lime-600"
            >
              Continue
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <IncorrectAnswerModal
          onClose={closeModal}
          correctAnswer={
            currentQuestion.isText
              ? currentQuestion.options[0].text
              : currentQuestion.correctAnswer
          }

        />
      )}
      {showZeroLivesModal && (
        <ZeroLivesModal 
          onRestoreLives={handleRestoreLives}
          onReturnHome={handleReturnHome}
        />
      )}
      {isVisible && (
        <LackOfGemsModal 
          onReturnHome={handleReturnHome}
        />
      )}
      {
        showCloseModal && (
          <CloseLessonModal
            onKeepLearning={handleKeepLearning}
            onReturnHome={handleReturnHome}
          />
        )
      }
    </div>
  );
}

export default LessonPage;


