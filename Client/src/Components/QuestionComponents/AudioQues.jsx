import { useState } from 'react';
import { Mic, Volume2 } from 'lucide-react';
import propTypes from 'prop-types';

const AudioQuestion = ({ 
  currentQuestion,
  hasChecked,
  isCorrect,
  // eslint-disable-next-line react/prop-types
  setIsCorrect,
  onOptionSelect,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcriptionInput, setTranscriptionInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [fillInBlankAnswer, setFillInBlankAnswer] = useState('');

  if (!currentQuestion) {
    return <div className="text-center text-gray-500">No question data available</div>;
  }

  

  const handleAudioPlay = () => {
    if (!currentQuestion.audioUrl) return;
    setIsPlaying(true);
    const audio = new Audio(currentQuestion.audioUrl);
    audio.onended = () => setIsPlaying(false);
    audio.play().catch(error => {
      console.error('Audio playback failed:', error);
      setIsPlaying(false);
    });
  };

  const handleRecordingComplete = (recordedAnswer) => {
    setIsRecording(false);

    const isAnswerCorrect = recordedAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase();
    onOptionSelect(recordedAnswer);
      setIsCorrect(isAnswerCorrect);
  };

  const renderFillInBlank = () => {
    const parts = currentQuestion.sentence?.split('_____') || ['', ''];
    
    return (
      <div className="space-y-4 mb-10 px-4 md:px-24 lg:px-96 font-playpen">
        <h2 className="text-2xl font-semibold  text-gray-800 mb-6">{currentQuestion.questionType}</h2>
        <div className="flex justify-center mb-8">
          <button
            onClick={handleAudioPlay}
            className={`p-6 rounded-full ${isPlaying ? 'bg-blue-100' : 'bg-gray-100'} hover:bg-blue-50 transition-colors`}
          >
            <Volume2 
              className={`w-8 h-8 ${isPlaying ? 'text-blue-500' : 'text-gray-500'}`}
            />
          </button>
        </div>
        <div className="text-lg">
          {parts[0]}
          <input
              type="text"
              value={fillInBlankAnswer}
              onChange={(e) => {
                const newValue = e.target.value;
                setFillInBlankAnswer(newValue); 
                onOptionSelect(newValue);
            }}
              className={`mx-2 border-b-2 outline-none px-2 w-32 ${
              hasChecked
                ? isCorrect
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
                : 'border-gray-300'
            }`}
            placeholder="Type answer..."
            disabled={hasChecked}
          />
          {parts[1]}
        </div>
      </div>
    );
  };

  const renderTranscription = () => (
    <div className="space-y-4 mb-10 px-4 md:px-24 lg:px-96 font-playpen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{currentQuestion.questionType}</h2>
      <div className="flex justify-center mb-8">
       
        
        <button
        onClick={handleAudioPlay}
        className={`p-6 rounded-full ${isPlaying ? 'bg-blue-100' : 'bg-gray-100'} hover:bg-blue-50 transition-colors`}
        >
        <Volume2
          className={`w-8 h-8 ${isPlaying ? 'text-blue-500' : 'text-gray-500'}`} />
      </button>
    </div><input
        type="text"
        value={transcriptionInput}
        onChange={(e) => {
          const newValue = e.target.value;
          setTranscriptionInput(newValue);
          onOptionSelect(newValue);
        } }
        className={`w-full p-3 border-2 rounded-lg outline-none ${hasChecked
            ? isCorrect
              ? 'border-green-500 bg-green-50'
              : 'border-red-500 bg-red-50'
            : 'border-gray-300'}`}
        placeholder="Type what you hear..."
        disabled={hasChecked} />
    </div>
  );

  const renderReadAloud = () => (
    <div className="space-y-4 mb-10 px-4 md:px-24 lg:px-96 font-playpen ">
      <h2 className="text-3xl text-gray-800 mb-3 md:px-10 lg:px-20">{currentQuestion.questionType}</h2>
      <div className={`bg-white p-6 rounded-lg shadow-sm border mb-8  ${
        hasChecked
          ? isCorrect
            ? 'border-green-500 bg-green-50'
            : 'border-red-500 bg-red-50'
          : 'border-gray-200'
      }`}>
        <button
          onClick={handleAudioPlay}
          className={`p-6 rounded-full ${isPlaying ? 'bg-blue-100' : 'bg-gray-100'} hover:bg-blue-50 transition-colors`}
        >
          <Volume2 
            className={`w-8 h-8 ${isPlaying ? 'text-blue-500' : 'text-gray-500'}`}
          />
        </button>
        <span className="text-xl ml-5">  {currentQuestion.sentence}</span>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            setIsRecording(!isRecording);
            if (isRecording) {
              handleRecordingComplete('example recorded answer'); 
            }
          }}
          className={`p-4 rounded-full ${
            isRecording ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-500'
          } hover:opacity-90 transition-colors flex items-center gap-2`}
          disabled={hasChecked}
        >
          <Mic className="w-6 h-6" />
          <span className="font-medium">
            {isRecording ? 'Stop' : 'Click to Speak'}
          </span>
        </button>
      </div>
    </div>
  );

  const type = (currentQuestion.questionType || '').toLowerCase();
  
  switch (type) {
    case 'fill-in-the-blank':
      return renderFillInBlank();
    case 'transcription':
      return renderTranscription();
    case 'read-aloud':
      return renderReadAloud();
    default:
      return (
        <div className="text-center text-gray-500">
          Unsupported question type: {currentQuestion.questionType}
        </div>
      );
  }
};

AudioQuestion.propTypes = {
  currentQuestion: propTypes.shape({
    questionType: propTypes.string,
    audioUrl: propTypes.string,
    sentence: propTypes.string,
    correctAnswer: propTypes.string,
  }),
  onOptionSelect: propTypes.func,
  onRecordingComplete: propTypes.func,
  hasChecked: propTypes.bool,
  isCorrect: propTypes.bool,

};

export default AudioQuestion;
