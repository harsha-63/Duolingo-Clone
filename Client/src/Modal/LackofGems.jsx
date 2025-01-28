

// eslint-disable-next-line react/prop-types
const LackOfGemsModal = ({ onReturnHome }) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80">
        <img
          src="https://i.pinimg.com/originals/98/59/12/98591272861e66a02eecf5dae0450c73.gif"
          alt="Duo Character"
          className="w-72 h-44 sm:w-72 sm:h-44 md:w-80 md:h-52 lg:w-96 lg:h-60 xl:w-96 xl:h-60"
        />
        <h2 className="text-lg font-bold text-gray-800 text-center">
          You don&apos;t have enough gems
        </h2>
        <div className="mt-6 space-y-4">
          <button
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors"
          >
            Practice for Lives
          </button>
          <button
            onClick={onReturnHome}
            className="w-full py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-lg transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LackOfGemsModal;
