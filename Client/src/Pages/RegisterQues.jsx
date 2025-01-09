import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';

const RegisterSection = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get('http://localhost:4000/public/lang'); 
        setLanguages(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching languages:", error);
        setLoading(false);
      }
    };
    fetchLanguages();
  }, []);

  const handleLanguageSelect = (language) => {
    // Save selected language in local storage
    localStorage.setItem('selectedLanguage', language.name);
    navigate('/welcome');
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="p-8 px-72">
        <h1 className="text-3xl font-playpen mb-10 text-center text-gray-800 font-semibold">I want to learn...</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center justify-center">
          {languages.map((language) => (
            <div
              key={language.name}
              className="border h-64 border-gray-200 rounded-lg p-4 text-center shadow-sm hover:shadow-lg transition hover:bg-blue-50 cursor-pointer"
              onClick={() => handleLanguageSelect(language)}
            >
              <img src={language.flag} alt={`${language.name} flag`} className="w-14 h-14 mx-auto mb-2" />
              <h2 className="text-xl font-semibold">{language.name}</h2>
              <p className="text-sm text-gray-500">{language.users}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisterSection;

