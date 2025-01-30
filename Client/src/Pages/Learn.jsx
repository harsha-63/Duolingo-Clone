import { useContext,useState } from 'react';
import { LessonContext } from '../Context/LessonContext';
import { FaBook, FaStar, FaTrophy, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const Learn = () => {
  const { sections } = useContext(LessonContext); 
  const { user } = useContext(AuthContext);
  const [showBox, setShowBox] = useState(false);
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [isClickedLessonAvailable, setIsClickedLessonAvailable] = useState(false);
  const navigate = useNavigate();

  const handleLessonClick = (lessonId, event,isAvailable) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setBoxPosition({
      x: rect.right + 10, 
      y: rect.top
    });
    setSelectedLessonId(lessonId);
    setIsClickedLessonAvailable(isAvailable);
    setShowBox(true);
  };

  const handleStartLesson = () => {
    if (user?.life > 0) {
      localStorage.removeItem(`lesson_${selectedLessonId}_progress`);
      navigate(`/lesson/${selectedLessonId}`);
    }
    setShowBox(false);
  };

  const handlePractice = () => {
    navigate('/learn');
    setShowBox(false);
  };

  const getColorClass = (color) => {
    switch (color) {
      case 'pink':
        return 'bg-purple-400';
      case 'blue':
        return 'bg-blue-500';
      case 'green':
        return 'bg-lime-500';
      default:
        return 'bg-gray-200';
    }
  };

  const getCirclePosition = (index, totalLessons, isConvex) => {
    const verticalSpacing = 120;
    const maxHorizontalOffset = 160;

    const y = index * verticalSpacing;
    const normalizedPos = index / (totalLessons - 1);
    const curve = 4 * normalizedPos * (1 - normalizedPos);

    const x = isConvex ? maxHorizontalOffset * (1 - curve) : maxHorizontalOffset * curve;

    return { x, y };
  };

  const determineNextAvailableLesson = (lessons) => {
    const completedLessons = user?.completedLessons || [];
    return lessons.findIndex(lessonId => !completedLessons.includes(lessonId));
  };

  return (
    <div className="max-w-7xl mx-auto p-6  max-md:p-0 ">
      {sections.map((section, sectionIndex) => {
        const nextAvailableLessonIndex = determineNextAvailableLesson(section.lessons)

        return (
          <div key={section.id} className="mb-16 md:mb-32 relative mx-2 md:mx-3  max-md:mt-20 ">
            <div
              className={`flex justify-between items-center mb-10 p-4 border-2 rounded-lg ${getColorClass(
                section.color
              )}`}
            >
              <div className="flex flex-col space-y-2 p-1">
                <span className="text-lg max-md:text-sm font-semibold text-white">Section {section.number}</span>
                <h2 className="text-2xl max-md:text-lg font-bold font-playpen text-white">{section.title}</h2>
              </div>
              <div className="flex items-center space-x-2 border-l-2 border-white pl-4 ">
                <span className="text-lg max-md:hidden font-semibold text-white font-playpen">Guide Book</span>
                <button className="text-white p-3 rounded-full transition-colors" title="Guide Book">
                  <FaBook />
                </button>
              </div>
            </div>

            <div
              className="relative mt-12 "
              style={{
                height: `${section.lessons.length * 120}px`,
                marginLeft: '160px',
              }}
            >
              <div
                className={`absolute ${sectionIndex % 2 === 0 ? 'right-0' : 'left-0'}`}
                style={{
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                <img src={section.character} alt="Section Character" className="w-96 h-96" />
              </div>

              {section.lessons.map((lessonId, lessonIndex) => {
                const position = getCirclePosition(
                  lessonIndex,
                  section.lessons.length,
                  sectionIndex % 2 === 0
                );
                const isLastLesson = lessonIndex === section.lessons.length - 1;
                const isCompleted =user?.completedLessons?.includes(lessonId);
                const isNextAvailableLesson = lessonIndex === nextAvailableLessonIndex;

                const bgColorClass = isCompleted 
                  ? getColorClass(section.color)
                  : isNextAvailableLesson
                  ? getColorClass(section.color)
                  : 'bg-gray-300 opacity-50';

                return (
                  <div
                    key={lessonIndex}
                    className="absolute"
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div
                      className={`relative text-center w-20 h-20 ${bgColorClass} 
                        text-white rounded-full flex flex-col justify-center 
                        items-center gap-1 font-semibold hover:bg-opacity-80 
                        transition-all cursor-pointer shadow-md hover:shadow-lg`}
                      onClick={(e) => handleLessonClick(lessonId, e, isNextAvailableLesson || isCompleted)}
                    >
                      {isLastLesson ? (
                        <FaTrophy className="text-yellow-400 text-5xl" />
                      ) : isCompleted ? (
                        <FaCheckCircle className="text-white text-5xl" />
                      ) : (
                        <FaStar className="text-white text-5xl" />
                      )}
                    
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

{showBox && (
    <div 
      className="absolute bg-white rounded-lg shadow-lg p-4 w-64 border border-gray-200"
      style={{ 
        left: `${boxPosition.x}px`, 
        top: `${boxPosition.y}px`,
        zIndex: 10 
      }}
    >
      {user?.life > 0 ? (
        isClickedLessonAvailable || user?.completedLessons?.includes(selectedLessonId) ? (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Discuss your experience
            </h3>
            <button
              onClick={handleStartLesson}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <span>Start</span>
              <span className="text-sm font-medium">+30 XP</span>
            </button>
          </div>
        ) : (
          <div className="text-gray-500">
            <h3 className="text-lg font-semibold mb-2">Discuss your work experience</h3>
            <p className="text-sm mb-4">Complete all levels above to unlock this!</p>
            <button
              disabled
              className="w-full bg-gray-200 text-gray-400 py-2 px-4 rounded-lg flex items-center justify-center uppercase text-sm font-medium"
            >
              LOCKED
            </button>
          </div>
        )
      ) : (
        <>
          <p className="text-gray-700 mb-3">
            You haven&apos;t life for learning.
          </p>
          <button
            onClick={handlePractice}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            Practice for life
          </button>
        </>
      )}
    </div>
  )}
    </div>
  );
};

export default Learn;





























