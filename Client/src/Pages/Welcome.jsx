import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/learn');
  };

  return (
    <div className="flex justify-center items-center flex-col mt-20 sm:mt-32 md:mt-40 lg:mt-48 xl:mt-60">
      <div className="flex flex-col sm:flex-row sm:space-x-6 items-center mb-24">
        <div className="relative text-lg mb-12 sm:mb-0 font-playpen font-semibold text-gray-700 bg-gray-100 p-4 rounded-lg border border-gray-300 shadow-md max-w-xs mx-auto">
          <p>"Hi there, I'm Duo"</p>
          
          {/* Arrow on the right bottom corner */}
          <div className="absolute right-[-10px] bottom-[-10px] w-0 h-0 border-t-8 border-l-8 border-b-8 border-r-0 border-transparent border-l-gray-100 "></div>
        </div>
        <img 
          src="https://i.pinimg.com/originals/98/59/12/98591272861e66a02eecf5dae0450c73.gif" 
          alt="Duo Character" 
          className="w-72 h-44 sm:w-72 sm:h-44 md:w-80 md:h-52 lg:w-96 lg:h-60 xl:w-96 xl:h-60"
        />
      </div>

      <div className="border-t border-gray-300 w-full mt-4 bg-slate-950" />
      
      <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 flex justify-center sm:justify-end items-center sm:ml-96">
        <button
          onClick={handleContinue}
          className="bg-lime-500 text-white py-2 px-10 rounded-lg shadow-lg shadow-lime-900 hover:shadow-2xl font-playpen font-semibold text-lg hover:bg-lime-600 transition"
        >
          Continue
        </button>
      </div>

    </div>
  );
};

export default WelcomePage;





