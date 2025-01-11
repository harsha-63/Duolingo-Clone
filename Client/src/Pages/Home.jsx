import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Importing arrow icons

const HomePage = () => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get('http://localhost:4000/public/lang');
        if (Array.isArray(response.data)) {
          setLanguages(response.data);
          setSelectedLanguage(response.data[0]);
        } else {
          console.error("Error: The response is not an array");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching languages:", error);
        setLoading(false);
      }
    };
    fetchLanguages();
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide + 6 < languages.length) {
      setCurrentSlide(currentSlide + 3);
    }
  };

  const handlePrev = () => {
    if (currentSlide - 3 >= 0) {
      setCurrentSlide(currentSlide - 3);
    }
  };

  const displayedLanguages = languages.slice(currentSlide, currentSlide + 6);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex flex-col lg:flex-row items-center justify-center flex-grow px-4 sm:px-16 lg:px-64">
        <div className="lg:w-1/2 relative">
          <img
            src="https://i.pinimg.com/736x/f2/e6/03/f2e6037ef56c8458f07aa76e1b762793.jpg"
            alt="Language Learning"
            className="w-5/6 h-auto transform sm:translate-x-0 translate-x-8 transition-transform duration-500"
          />
        </div>
        <div className="lg:w-1/2 text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl font-playpen font-semibold text-gray-700 mb-6">
            <span className="inline-block">The free, fun, and effective way to</span>
            <span className="block text-center">learn a language!</span>
          </h1>
          <Link to={'/register'}>
            <button className="w-full sm:w-80 px-6 py-4 bg-lime-500 text-white font-semibold rounded-xl text-sm hover:start-60 transition font-playpen">
              GET STARTED
            </button>
          </Link>
          <div>
            <Link to="/isLoggin">
              <button className="w-full sm:w-80 px-4 py-4 bg-white border border-gray-300 font-semibold text-sm rounded-xl hover:bg-gray-100 transition text-blue-400 font-playpen">
                I ALREADY HAVE AN ACCOUNT
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Responsive footer: hidden on small screens */}
      <footer className="py-4 border-t border-gray-200 hidden sm:block">
        {loading ? (
          <p className="text-center">Loading languages...</p>
        ) : (
          <div className="relative">
            <div className="flex justify-between items-center space-x-4 px-2 sm:px-4">
              <FaChevronLeft
                className={`text-gray-700 cursor-pointer hover:text-gray-900 ${
                  currentSlide === 0 ? 'opacity-50 cursor-default' : ''
                }`}
                onClick={handlePrev}
              />
              <div className="flex gap-6 overflow-hidden">
                {Array.isArray(languages) && languages.length > 0 ? (
                  displayedLanguages.map((lang) => (
                    <div key={lang.name} className="flex items-center space-x-2">
                      <img src={lang.flag} alt={lang.name} className="w-6 h-6" />
                      <span>{lang.name}</span>
                    </div>
                  ))
                ) : (
                  <p>No languages available</p>
                )}
              </div>
              <FaChevronRight
                className={`text-gray-700 cursor-pointer hover:text-gray-900 ${
                  currentSlide + 6 >= languages.length ? 'opacity-50 cursor-default' : ''
                }`}
                onClick={handleNext}
              />
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

export default HomePage;

















