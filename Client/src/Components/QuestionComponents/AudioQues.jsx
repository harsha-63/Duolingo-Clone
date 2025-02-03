import { useState, useEffect, useCallback } from 'react';
import { Mic, Volume2 } from 'lucide-react';
import propTypes from 'prop-types';
import { useReactMediaRecorder } from 'react-media-recorder';

const AudioQuestion = ({ 
  currentQuestion,
  hasChecked,
  isCorrect,
  onOptionSelect,
  onRecordingComplete
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcriptionInput, setTranscriptionInput] = useState('');
  const [fillInBlankAnswer, setFillInBlankAnswer] = useState('');
  const [transcribedText, setTranscribedText] = useState('');
  const [recognition, setRecognition] = useState(null);

  // Memoize the transcript handler to prevent recreating speech recognition
  const handleTranscript = useCallback((transcript) => {
    console.log('Starting transcription...');
    console.log('Transcribed text:', transcript);
    setTranscribedText(transcript); 
    onOptionSelect(transcript);
}, [onOptionSelect, setTranscribedText]); 

  useEffect(() => {
    // Initialize speech recognition
    console.log('Initializing speech recognition...');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

     

      recognitionInstance.onresult = (event) => {
        console.log('Speech recognition event triggered');
        console.log(event.results);
    
        if (!event.results || event.results.length === 0) {
            console.warn('No transcription results received.');
            return;
        }
    
        const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
    
        console.log('Final transcript:', transcript);
        handleTranscript(transcript);
    };

    recognitionInstance.onstart = () => {
      console.log('Speech recognition started');
    };
    

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognitionInstance.onend = () => {
        console.log('Speech recognition ended');
      };

      setRecognition(recognitionInstance);
    } else {
      console.warn('Speech Recognition not supported in this browser');
    }

    // Cleanup function
    return () => {
      if (recognition) {
        recognition.stop();
        console.log('Speech recognition cleaned up');
      }
    };
  }, [handleTranscript]);

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    onStart: () => {
      console.log('Recording started');
    },
    onStop: (blobUrl, blob) => {
      console.log('Recording stopped');
      if (blob) {
        onRecordingComplete({ 
          blobUrl, 
          transcribedText: transcribedText 
        });
      }
    }
  });

  if (!currentQuestion) {
    return <div className="text-center text-gray-500">No question data available</div>;
  }

  const handleStartRecording = () => {
    console.log('Starting recording and recognition...');
    startRecording();
    if (recognition) {
      recognition.start();
    }
  };

  const handleStopRecording = () => {
    console.log('Stopping recording and recognition...');
    stopRecording();
    if (recognition) {
      recognition.stop();
    }
  };

  const handleAudioPlay = () => {
    if (!currentQuestion.audioUrl) {
      console.warn('No audio URL provided');
      return;
    }
    console.log('Playing audio...');
    setIsPlaying(true);
    const audio = new Audio(currentQuestion.audioUrl);
    audio.onended = () => {
      console.log('Audio playback ended');
      setIsPlaying(false);
    };
    audio.play().catch(error => {
      console.error('Audio playback failed:', error);
      setIsPlaying(false);
    });
  };

  const renderFillInBlank = () => {
    const parts = currentQuestion.sentence?.split('_____') || ['', ''];
    
    return (
      <div className="space-y-4 mb-10 px-4 md:px-24 lg:px-96 font-playpen">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">{currentQuestion.questionType}</h2>
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
            className={`w-8 h-8 ${isPlaying ? 'text-blue-500' : 'text-gray-500'}`} 
          />
        </button>
      </div>
      <input
        type="text"
        value={transcriptionInput}
        onChange={(e) => {
          const newValue = e.target.value;
          setTranscriptionInput(newValue);
          onOptionSelect(newValue);
        }}
        className={`w-full p-3 border-2 rounded-lg outline-none ${
          hasChecked
            ? isCorrect
              ? 'border-green-500 bg-green-50'
              : 'border-red-500 bg-red-50'
            : 'border-gray-300'
        }`}
        placeholder="Type what you hear..."
        disabled={hasChecked}
      />
    </div>
  );

  const renderReadAloud = () => (
    <div className="space-y-4 mb-10 px-4 md:px-24 lg:px-96 font-playpen">
      <h2 className="text-3xl text-gray-800 mb-3 md:px-10 lg:px-20">{currentQuestion.questionType}</h2>
      <div className={`bg-white p-6 rounded-lg shadow-sm border mb-8 ${
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
        <span className="text-xl ml-5">{currentQuestion.sentence}</span>
      </div>
      <div className="flex flex-col items-center">
        {mediaBlobUrl && (
          <audio src={mediaBlobUrl} controls className="w-full mb-4" />
        )}
        <button
          onClick={() => {
            if (status === 'recording') {
              handleStopRecording();
            } else {
              handleStartRecording();
            }
          }}
          className={`p-4 rounded-full ${
            status === 'recording' ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-500'
          } hover:opacity-90 transition-colors flex items-center gap-2`}
          disabled={hasChecked}
        >
          <Mic className="w-6 h-6" />
          <span className="font-medium">
            {status === 'recording' ? 'Stop' : 'Click to Speak'}
          </span>
        </button>
        {transcribedText && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg w-full">
            <p className="text-gray-600">Your speech: {transcribedText}</p>
          </div>
        )}
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