import { useContext } from 'react';
import { LessonContext } from '../Context/LessonContext';
import { FaBook, FaStar, FaTrophy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Learn = () => {
  const { sections } = useContext(LessonContext);
  const navigate = useNavigate();

  const handleLessonClick = (lessonId) => {
    navigate(`/lesson/${lessonId}`);
  };

  const getColorClass = (color) => {
    switch (color) {
      case 'pink':
        return 'bg-pink-300';
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

    // Calculate X position for lessons
    const x = isConvex ? maxHorizontalOffset * (1 - curve) : maxHorizontalOffset * curve;

    return { x, y };
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {sections.map((section, sectionIndex) => (
        <div key={section.id} className="mb-32 relative mx-3">
          <div
            className={`flex justify-between items-center mb-10 p-4 border-2 rounded-lg ${getColorClass(
              section.color
            )}`}
          >
            <div className="flex flex-col space-y-2 p-1">
              <span className="text-lg font-semibold text-white">Section {section.number}</span>
              <h2 className="text-2xl font-bold text font-playpen text-white">{section.title}</h2>
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
              marginLeft: "160px"
            }}
          >
            {/* Position the character image in the middle of the section */}
            <div
              className={`absolute ${sectionIndex % 2 === 0 ? 'right-0' : 'left-0'}`}
              style={{
                top: `50%`,
                transform: 'translateY(-50%)', 
              }}
            >
              <img 
                src={section.character} 
                alt="Section Character" 
                className="w-96 h-96" 
              />
            </div>

            {section.lessons.map((lesson, lessonIndex) => {
              const position = getCirclePosition(
                lessonIndex,
                section.lessons.length,
                sectionIndex % 2 === 0
              );

              const isLastLesson = lessonIndex === section.lessons.length - 1;

              return (
                <div key={lesson.id} className="absolute" style={{ 
                  left: `${position.x}px`,
                  top: `${position.y}px`,
                  transition: 'all 0.3s ease'
                }}>
                  <div
                    className={`relative text-center w-20 h-20 ${getColorClass(
                      section.color
                    )} text-white rounded-full 
                             flex flex-col justify-center items-center gap-1 font-semibold hover:bg-opacity-80 
                             transition-all cursor-pointer shadow-md hover:shadow-lg`}
                    onClick={() => handleLessonClick(lesson._id)}
                  >
                    {isLastLesson ? (
                      <FaTrophy className="text-yellow-400 text-5xl" />
                    ) : (
                      <FaStar className="text-white text-5xl" />
                    )}
                    <span className="text-sm">{lesson.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Learn;




























