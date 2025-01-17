import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const LessonContext = createContext();

// eslint-disable-next-line react/prop-types
const LessonProvider = ({ children }) => {
  const [sections, setSections] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        // Fetch sections
        const sectionsResponse = await axios.get('http://localhost:4000/user/sections');
        setSections(sectionsResponse.data);
       

        if (sectionsResponse.data.length > 0) {
          const firstSectionId = sectionsResponse.data[0]._id;
          const lessonsResponse = await axios.get(
            `http://localhost:4000/user/sections/${firstSectionId}/lessons`
          );
          setLessons(lessonsResponse.data);
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const setActiveLesson = async (lessonId) => {
    try {
      if (!lessonId) return;
      
      setActiveLessonId(lessonId);
      const response = await axios.get(
        `http://localhost:4000/user/lesson/${lessonId}/questions`
      );
      setQuestions(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching lesson questions:', error);
      setError(error.message);
    }
  };

  return (
    <LessonContext.Provider
      value={{
        sections,
        lessons,
        questions,
        activeLessonId,
        setActiveLesson,
        isLoading,
        error
      }}
    >
      {children}
    </LessonContext.Provider>
  );
};

export default LessonProvider;


