import { useContext } from 'react';
import { LessonContext } from '../Context/LessonContext';
import { FaBook, FaStar } from 'react-icons/fa';  // Import FaStar
import { useNavigate } from 'react-router-dom';

const LessonPage = () => {
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

  return (
    <div className="max-w-7xl mx-auto p-6 ">
      {sections.map((section) => (
        <div key={section.id} className="mb-16 relative mx-3">
          <div
            className={`flex justify-between items-center mb-10 p-4 border-2 rounded-lg ${getColorClass(section.color)}`}
          >
            <div className="flex flex-col space-y-2 p-1 ">
              <span className="text-lg font-semibold text-white">Section {section.number}</span>
              <h2 className="text-2xl font-bold text font-playpen text-white">{section.title}</h2>
            </div>
            <div className="flex items-center space-x-2 border-l-2 border-white pl-4"> 
              <span className="text-lg font-semibold text-white font-playpen">Guide Book</span>
              <button className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors" title="Guide Book">
                <FaBook />
              </button>
            </div>
          </div>
          <div className="relative mt-12 ml-44" style={{ height: `${section.lessons.length * 120}px` }}>
            {section.lessons.map((lesson, lessonIndex) => (
              <div key={lesson.id} className="absolute" style={{ top: `${lessonIndex * 120}px` }}>
                {/* Star Icon */}
                <div
                  className="absolute text-center w-6 h-6 bg-transparent text-white rounded-full flex justify-center items-center font-semibold"
                  style={{
                    left: `${lessonIndex % 2 === 0 ? 40 : 200}px`,
                    top: '-30px',  // Adjusting top value to position the star above the node
                    zIndex: 10,    // Ensure the star is above the lesson node
                  }}
                >
                  <FaStar />
                </div>
                <div
                  className={`absolute text-center w-20 h-20 ${getColorClass(section.color)} text-white rounded-full 
                           flex justify-center items-center font-semibold hover:bg-opacity-80 
                           transition-all cursor-pointer shadow-md hover:shadow-lg`}
                  style={{
                    left: `${lessonIndex % 2 === 0 ? 40 : 200}px`,
                    transition: 'all 0.3s ease',
                    zIndex: 5,    // Ensure the lesson button is below the star icon
                  }}
                  onClick={() => handleLessonClick(lesson.id)}
                >
                  {lesson.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonPage;



























