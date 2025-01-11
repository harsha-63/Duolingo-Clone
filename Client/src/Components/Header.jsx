import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import axios from 'axios';

const Header = () => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get('http://localhost:4000/public/lang');
        if (Array.isArray(response.data)) {
          setLanguages(response.data);
          setSelectedLanguage(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  const toggleLanguage = (language) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false); 
  };

  return (
    <header className="flex justify-between items-center px-64 py-3 pb-7 bg-white">
      <div className="flex items-center space-x-2">
        <img
          src="https://i.pinimg.com/736x/fc/e8/ae/fce8ae69cc7d5aaf01208014b3e58dd4.jpg"
          alt="Duolingo Logo"
          className="w-44 h-10"
        />
      </div>
      <div
        className="relative inline-block"
        onMouseEnter={() => setIsDropdownOpen(true)} 
        onMouseLeave={() => setIsDropdownOpen(false)} 
      >
        <button className="flex items-center space-x-2 px-4 py-2 bg-white">
          <h3 className="text-gray-500 font-playpen font-semibold text-sm">SITE LANGUAGE:</h3>
          <span className="text-gray-500 font-playpen text-lg">
            {selectedLanguage ? selectedLanguage.name : 'Loading...'}
          </span>
          <FaChevronDown className="text-gray-500 cursor-pointer" />
        </button>
        {isDropdownOpen && (
          <div className="absolute mt-2 bg-white border rounded shadow-lg w-48">
            {languages.map((language) => (
              <div
                key={language.code}
                onClick={() => toggleLanguage(language)}
                className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-100 text-gray-500 font-playpen text-lg"
              >
                <img src={language.flag} alt={language.name} className="w-5 h-5" />
                <span>{language.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;


