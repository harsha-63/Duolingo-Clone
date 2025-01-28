import { useContext } from 'react';
import { LessonContext } from '../Context/LessonContext';
import { FaBook, FaStar, FaTrophy, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const Learn = () => {
  const { sections } = useContext(LessonContext); 
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLessonClick = (lessonId) => {
    console.log(`Navigating to lesson ${lessonId}`);
    localStorage.removeItem(`lesson_${lessonId}_progress`);
    navigate(`/lesson/${lessonId}`);
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
    <div className="max-w-7xl mx-auto p-6 ">
      {sections.map((section, sectionIndex) => {
        const nextAvailableLessonIndex = determineNextAvailableLesson(section.lessons)

        return (
          <div key={section.id} className="mb-32 relative mx-3">
            <div
              className={`flex justify-between items-center mb-10 p-4 border-2 rounded-lg ${getColorClass(
                section.color
              )}`}
            >
              <div className="flex flex-col space-y-2 p-1">
                <span className="text-lg font-semibold text-white">Section {section.number}</span>
                <h2 className="text-2xl font-bold font-playpen text-white">{section.title}</h2>
              </div>
              <div className="flex items-center space-x-2 border-l-2 border-white pl-4">
                <span className="text-lg font-semibold text-white font-playpen">Guide Book</span>
                <button className="text-white p-3 rounded-full transition-colors" title="Guide Book">
                  <FaBook />
                </button>
              </div>
            </div>

            <div
              className="relative mt-12"
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
                      onClick={() => handleLessonClick(lessonId)}
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
    </div>
  );
};

export default Learn;





























