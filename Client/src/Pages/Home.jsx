import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
          console.log(response.data);
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

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

          <Link to={'/register'}>
            <button className="w-80 px-6 py-3 bg-lime-500 text-white font-semibold rounded-lg hover:start-60 transition">
              GET STARTED
            </button>
          </Link>

          <div>
            <Link to="/isLoggin">
              <button className="w-80 px-4 py-3 bg-white border border-gray-300 font-semibold rounded-lg hover:bg-gray-100 transition text-blue-400">
                I ALREADY HAVE AN ACCOUNT
              </button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-4 pt-6 border-t border-gray-200">
        <div className="relative overflow-hidden">
         
          {loading ? (
            <p>Loading languages...</p>
          ) : (
            <div className="flex justify-center gap-10 items-center space-x-2 animate-scroll">
              {Array.isArray(languages) && languages.length > 0 ? (
                languages.map((lang) => (
                  <div key={lang.name} className="flex items-center space-x-2">
                    <img src={lang.flag} alt={lang.name} className="w-6 h-6" />
                    <span>{lang.name}</span>
                  </div>
                ))
              ) : (
                <p>No languages available</p>
              )}
            </div>
          )}
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-gray-50" />
          <div className="absolute inset-y-0 right-0 bg-gradient-to-l from-gray-50" />
        </div>
      </footer>
    </div>
  );
};

export default HomePage;











