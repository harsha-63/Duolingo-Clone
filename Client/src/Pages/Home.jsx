
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const languages = [
      { name: 'English', code: 'en', flag: 'https://flagcdn.com/us.svg' },
      { name: 'Spanish', code: 'es', flag: 'https://flagcdn.com/es.svg' },
      { name: 'French', code: 'fr', flag: 'https://flagcdn.com/fr.svg' },
      { name: 'German', code: 'de', flag: 'https://flagcdn.com/de.svg' },
      { name: 'Japanese', code: 'jp', flag: 'https://flagcdn.com/jp.svg' },
    ];
  
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  
    const toggleLanguage = (language) => {
      setSelectedLanguage(language);
    };
  
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <header className="flex justify-between items-center px-64 py-3 pb-7 bg-white ">
          <div className="flex items-center space-x-2">
            <img
              src="https://i.pinimg.com/736x/fc/e8/ae/fce8ae69cc7d5aaf01208014b3e58dd4.jpg"
              alt="Duolingo Logo"
              className="w-44 h-10"
            />
          </div>
          <div className="relative inline-block group">
  <button className="flex items-center space-x-2 px-4 py-2  bg-white">
    <h3 className='text-gray-500 font-playpen font-semibold text-sm'>SITE LANGUAGE:</h3>
    <span className='text-gray-500 font-playpen text-lg'>{selectedLanguage.name}</span>
    <FaChevronDown className="text-gray-500 group-hover:text-gray-700 cursor-pointer" />
  </button>

  {/* Dropdown menu */}
  <div className="absolute mt-2 bg-white border rounded shadow-lg w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    {languages.map((language) => (
      <div
        key={language.code}
        onClick={() => toggleLanguage(language)}
        className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-100 text-gray-500 font-playpen text-lg'"
      >
        <img
          src={language.flag}
          alt={language.name}
          className="w-5 h-5"
        />
        <span>{language.name}</span>
      </div>
    ))}
  </div>
</div>

        </header>

      
 <main className="flex flex-col lg:flex-row items-center justify-center flex-grow px-64">
 <div className="lg:w-1/2">
   <img
     src="https://i.pinimg.com/736x/f2/e6/03/f2e6037ef56c8458f07aa76e1b762793.jpg"
     alt="Language Learning"
     className="w-5/6 h-auto"
   />
 </div>
 <div className="lg:w-1/2 text-center lg:text-center space-y-4">
 <h1 className="text-3xl font-playpen font-semibold text-gray-700 mb-6">
  <span className="inline-block">The free, fun, and effective way to</span>
  <span className="block text-center">learn a language!</span>
</h1>   

   <Link to={'/register'} className="space-y-4 ml-18">
  
  <button className="w-80 px-6 py-3 bg-lime-500 text-white font-semibold rounded-lg hover:start-60 transition">
    GET STARTED
  </button>
</Link>
<div>
  <Link to="/isLoggin" className="ml-18">
    <button className="w-80 px-4 py-3 bg-white border border-gray-300 font-semibold rounded-lg hover:bg-gray-100 transition text-blue-400">
      I ALREADY HAVE AN ACCOUNT
    </button>
  </Link>
</div>

 </div>
</main>


<footer className="py-4 pt-6 border-t border-gray-200">
 <div className="relative overflow-hidden">
   <div className="flex justify-center gap-10 items-center space-x-2 animate-scroll">
     {languages.map((lang) => (
       <div key={lang.name} className="flex items-center space-x-2">
         <img src={lang.flag} alt={lang.name} className="w-6 h-6" />
         <span>{lang.name}</span>
       </div>
     ))}
   </div>
   <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-gray-50" />
   <div className="absolute inset-y-0 right-0 bg-gradient-to-l from-gray-50" />
 </div>
</footer>
</div>
);
};

export default HomePage;








