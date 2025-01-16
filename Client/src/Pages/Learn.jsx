import { useContext } from 'react';
import { LessonContext } from '../Context/LessonContext';
import { FaBook } from 'react-icons/fa';

const LessonPage = () => {
  const { sections } = useContext(LessonContext);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100">
      {sections.map((section) => (
        <div key={section.id} className="mb-16">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-10 p-4 border-2 border-gray-300 rounded-lg">
            {/* Left side: Section number, title, and description */}
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-gray-500">Section {section.number}</span>
              <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
              <p className="text-lg text-gray-600">{section.description}</p>
            </div>
            {/* Right side: Guide Book button */}
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-800">Guide Book</span>
              <button className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600" title="Guide Book">
                <FaBook />
              </button>
            </div>
          </div>

          {/* Lessons section */}
          <div className="relative mt-12 ml-16">
            {/* Display lessons */}
            {section.lessons.map((lesson, lessonIndex) => (
              <div key={lesson.id} className="relative mb-10">
                {/* Lesson */}
                <div
                  className="absolute text-center w-20 h-20 bg-green-500 text-white rounded-full flex justify-center items-center font-semibold"
                  style={{
                    top: `${lessonIndex * 120}px`,
                    left: `${lessonIndex % 2 === 0 ? 40 : 200}px`,
                    transition: 'left 0.3s ease',
                  }}
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






















