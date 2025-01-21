import { HeartCrack } from "lucide-react";

// eslint-disable-next-line react/prop-types
const IncorrectAnswerModal = ({ onClose, correctAnswer }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header with heart icon */}
        <div className="bg-red-50 p-6 flex flex-col items-center">
          <div className="bg-red-100 rounded-full p-4 mb-4">
            <HeartCrack className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 font-playpen">
            Incorrect
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-600 mb-3 text-center">
              The correct answer was:
            </p>
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <p className="text-green-800 font-medium text-center">
                {correctAnswer}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl transition-colors"
            >
              Got it
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-colors"
            >
              Review lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncorrectAnswerModal;