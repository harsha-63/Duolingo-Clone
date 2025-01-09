import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/learn');
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center flex-col mt-60">
        
        <div className="flex items-center space-x-0">
          <div className="relative text-lg mb-44 font-playpen font-semibold text-gray-700 bg-gray-100 p-4 rounded-lg border border-gray-300 shadow-md max-w-xs mx-auto">
            <p>"Hi there, I'm Duo"</p>
            
            {/* Arrow on the right bottom corner */}
            <div className="absolute right-[-10px] bottom-[-10px] w-0 h-0 border-t-8 border-l-8 border-b-8 border-r-0 border-transparent border-l-gray-100"></div>
          </div>
          <img src="https://i.pinimg.com/originals/98/59/12/98591272861e66a02eecf5dae0450c73.gif" alt="Duo Character" className="w-72 h-44" />
        </div>

        <div className="border-t border-gray-300 w-full mt-2 bg-slate-950" />
        
        <div className="mt-4 flex justify-end items-end ml-96">
          <button
            onClick={handleContinue}
            className="bg-lime-500 text-white py-2 px-10 rounded-lg shadow-lg shadow-lime-900 hover:shadow-2xl font-playpen font-semibold text-lg hover:bg-lime-600 transition"
          >
            Continue
          </button>
        </div>

      </div>
    </div>
  );
};

export default WelcomePage;

