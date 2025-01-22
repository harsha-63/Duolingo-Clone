import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const LessonContext = createContext();

// eslint-disable-next-line react/prop-types
const LessonProvider = ({ children }) => {
  const [sections, setSections] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [userProgress, setUserProgress] = useState({
    lessonsCompleted: [],
    currentLesson: null,
    xpPoints: 0,
    level: 1,
    streak: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionsResponse = await axios.get('http://localhost:4000/user/sections');
        setSections(sectionsResponse.data);
        console.log("sections:", sectionsResponse.data);

        if (sectionsResponse.data.length > 0) {
          const firstSectionId = sectionsResponse.data[0]._id;
          const lessonsResponse = await axios.get(`http://localhost:4000/user/sections/${firstSectionId}/lessons`);
          setLessons(lessonsResponse.data);
          console.log("lessons:", lessonsResponse.data);
        }

        // Fetch user progress if user is logged in
        const userId = localStorage.getItem('userId');
        if (userId) {
          const progressResponse = await axios.get(`http://localhost:4000/user/progress/${userId}`);
          setUserProgress(progressResponse.data.progress);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // Start a lesson
  const startLesson = async (lessonId) => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('userId');
      const response = await axios.post('http://localhost:4000/user/lesson/start', {
        userId,
        lessonId,
      });

      setUserProgress(prev => ({
        ...prev,
        currentLesson: lessonId
      }));

      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to start lesson');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Complete a lesson
  const completeLesson = async (lessonId) => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('userId');
      const response = await axios.post('http://localhost:4000/user/lesson/complete', {
        userId,
        lessonId,
      });

      setUserProgress(prev => ({
        ...prev,
        lessonsCompleted: [...prev.lessonsCompleted, lessonId],
        xpPoints: response.data.progress.xpPoints,
        level: response.data.progress.level,
        streak: response.data.progress.streak,
        currentLesson: null
      }));

      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to complete lesson');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Check if a lesson is completed
  const isLessonCompleted = (lessonId) => {
    return userProgress.lessonsCompleted.includes(lessonId);
  };

 
  const value = {
    sections,
    lessons,
    userProgress,
    loading,
    error,
    startLesson,
    completeLesson,
    isLessonCompleted,
  };

  return (
    <LessonContext.Provider value={value}>
      {children}
    </LessonContext.Provider>
  );
};

export default LessonProvider;