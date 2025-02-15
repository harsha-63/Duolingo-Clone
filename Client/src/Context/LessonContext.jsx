import { createContext, useState, useEffect,useCallback} from 'react';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const LessonContext = createContext();

// eslint-disable-next-line react/prop-types
const LessonProvider = ({ children }) => {
  const initialUserPrograss = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return {
        completedLessons: typeof user?.completedLessons === "object" ? user.completedLessons:[]
      };
    } catch {
      return { completedLessons:[] };
    }
  };
  const [sections, setSections] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [userProgress, setUserProgress] = useState(initialUserPrograss)
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
    const getUserId = useCallback(() => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.id || null;
      } catch {
        return null;
      }
    }, []);
 

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/user/sections`);
        setSections(sectionsResponse.data);
        

        if (sectionsResponse.data.length > 0) {
          const firstSectionId = sectionsResponse.data[0]._id;
          const lessonsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/user/sections/${firstSectionId}/lessons`);
          setLessons(lessonsResponse.data);
          
         
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const updateLocalStorage = useCallback((newProgress) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user')) || {};
      const updatedUser = { ...currentUser, ...newProgress };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  }, []);

  const updateProgress = useCallback((newProgress) => {
    setUserProgress(prev => {
      const updatedProgress = { ...prev, ...newProgress };
      updateLocalStorage(updatedProgress);
      return updatedProgress;
    });
  }, [updateLocalStorage]);
  const startLesson = async (lessonId) => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('userId');
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/lesson/start`, {
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

  const completeLesson = useCallback(async (lessonId) => {
    setLoading(true);
    setError(null);
     
    try {
      const userId = getUserId();
      if (!userId) throw new Error('User ID not found');
  
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/lesson/complete`, {
        userId: userId,
        lessonId: lessonId, 
      });
  
      const newProgress = { 
        completedLessons: Array.isArray(response.data.completedLessons) 
          ? response.data.completedLessons 
          : [lessonId]
      };
      
      updateProgress(newProgress);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to complete lesson';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [getUserId, updateProgress]);
  


useEffect(() => {
  const handleStorageChange = () => {
    const newStats = initialUserPrograss();
    setUserProgress(newStats);
  };

  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
}, []);

 
  const value = {
    sections,
    lessons,
    userProgress,
    loading,
    error,
    startLesson,
    completeLesson
   
   
  };

  return (
    <LessonContext.Provider value={value}>
      {children}
    </LessonContext.Provider>
  );
};

export default LessonProvider;




