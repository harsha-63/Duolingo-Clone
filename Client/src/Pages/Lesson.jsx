import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const LessonPage = () => {
  const { lessonId } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lessonQuestions, setLessonQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessonQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:4000/user/lesson/${lessonId}/questions`);
        setLessonQuestions(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load lesson questions');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (lessonId) {
      fetchLessonQuestions();
    }
  }, [lessonId]);

  const currentQuestion = lessonQuestions[currentQuestionIndex];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (currentQuestionIndex < lessonQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption('');
    }
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

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">No questions available</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="text-sm text-gray-500 mb-2">
          Question {currentQuestionIndex + 1} of {lessonQuestions.length}
        </div>
        <h2 className="text-2xl font-bold mb-6">{currentQuestion.questionText}</h2>
        
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all 
                ${selectedOption === option 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={!selectedOption}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all
          ${selectedOption 
            ? 'bg-blue-500 text-white hover:bg-blue-600' 
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
      >
        Continue
      </button>
    </div>
  );
};

export default LessonPage;