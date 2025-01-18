import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const LessonContext = createContext();

// eslint-disable-next-line react/prop-types
 const LessonProvider = ({ children }) => {
  const [sections, setSections] = useState([]);
  const [lessons, setLessons] = useState([]);
  // const [questions, setQuestions] = useState([]);

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

          // if (lessonsResponse.data.length > 0) {
          //   const firstLessonId = lessonsResponse.data[0]._id;
          //   const questionsResponse = await axios.get(`http://localhost:4000/user/lesson/${firstLessonId}/questions`);
          //   setQuestions(questionsResponse.data);
          //   console.log("questions:", questionsResponse.data);  
          // }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <LessonContext.Provider value={{ sections, lessons }}>
      {children}
    </LessonContext.Provider>
  );
};


export default LessonProvider;


