

// eslint-disable-next-line react/prop-types
const CloseLessonModal = ({  onKeepLearning,onReturnHome }) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        <div className="flex flex-col items-center">
          <img
            src="https://i.pinimg.com/originals/09/0b/b8/090bb89add14cff43e2197d480e49541.gif"
            alt="Sad Duolingo Character"
            className="w-28 h-auto mb-4"
          />
          <h2 className="text-lg font-bold text-gray-800 text-center mb-4">
            Wait, don’t go! You’ll lose your progress if you quit now
          </h2>
          <div className="flex gap-4 w-full mt-4">
            <button
              onClick={onKeepLearning}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors"
            >
              Keep Learning
            </button>
            <button
              onClick={onReturnHome}
              
              className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors"
            >
              End Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloseLessonModal;
