

import PropTypes from 'prop-types';

const TextQuestion = ({ 
  currentQuestion, 
  selectedOption, 
  hasChecked, 
  isCorrect, 
  onOptionSelect 
}) => {
  return (
    <div className="mb-10 px-4 md:px-24 lg:px-96 font-playpen">
      <div className="text-3xl text-gray-800 mb-3 md:px-10 lg:px-20">
        {currentQuestion?.questionType}
      </div>
      <p className="text-xl md:px-10 lg:px-20 mb-3">
        {currentQuestion?.question}
      </p>
      <h2 className="text-lg font-bold mb-6 md:px-10 lg:px-20">
        {currentQuestion?.questionText}
      </h2>
      <div className="space-y-4 md:px-10 lg:px-20">
        {currentQuestion?.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onOptionSelect(option.text)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              selectedOption === option.text
                ? hasChecked
                  ? isCorrect
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                  : "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            disabled={hasChecked}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

TextQuestion.propTypes = {
  currentQuestion: PropTypes.shape({
    questionType: PropTypes.string,
    question: PropTypes.string,
    questionText: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string
    }))
  }),
  selectedOption: PropTypes.string,
  hasChecked: PropTypes.bool,
  isCorrect: PropTypes.bool,
  onOptionSelect: PropTypes.func
};

export default TextQuestion;