import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';

const RegisterSection = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/public/lang`); 
        setLanguages(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching languages:", error);
        setLoading(false);
      }
    };
    fetchLanguages();

    
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLanguageSelect = (language) => {
    localStorage.setItem('selectedLanguage', language.name);
    navigate('/welcome');
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div>
      <div className={`fixed top-0 left-0 right-0 z-10 bg-white ${isScrolled ? 'shadow-md' : ''}`}>
        <Header />
      </div>
      
      <div className="pt-32 p-4 sm:px-8 md:px-16 lg:px-32 xl:px-72">
        <h1 className="text-2xl sm:text-3xl font-playpen mb-6 sm:mb-10 text-center text-gray-800 font-semibold">
          I want to learn...
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 items-center justify-center">
          {languages.map((language) => (
            <div
              key={language.name}
              className="border h-48 sm:h-56 md:h-64 border-gray-200 rounded-lg p-4 text-center shadow-sm hover:shadow-lg transition hover:bg-blue-50 cursor-pointer flex flex-col items-center justify-center"
              onClick={() => handleLanguageSelect(language)}
            >
              <img src={language.flag} alt={`${language.name} flag`} className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3" />
              <h2 className="text-lg sm:text-xl md:text-xl font-playpen text-gray-600 font-semibold">{language.name}</h2>
              <p className="text-sm sm:text-base text-gray-500">{language.users}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisterSection;






