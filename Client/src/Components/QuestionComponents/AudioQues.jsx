import { useState, useEffect, useCallback,useRef } from 'react';
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
  const [isRecognitionActive, setIsRecognitionActive] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');

  // Enhanced speech recognition setup

  const transcribedTextRef = useRef('');
 
  const setupSpeechRecognition = useCallback(() => {
    // Check for browser support
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      console.error('Speech Recognition not supported in this browser');
      return null;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
    

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0].transcript;

          if (result.isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript.trim()) {
          console.log('Final Transcript:', finalTranscript);
          transcribedTextRef.current += finalTranscript; // Update ref instead of state
          setTranscribedText(transcribedTextRef.current);
          onOptionSelect(finalTranscript);
        }

        if (interimTranscript.trim()) {
          console.log('Interim Transcript:', interimTranscript);
          setInterimTranscript(interimTranscript);
        }
      };


      recognitionInstance.onerror = (event) => {
        console.error('Speech Recognition Error:', event.error);
        setIsRecognitionActive(false);
      };

      recognitionInstance.onstart = () => {
        console.log('Speech Recognition Started');
        setIsRecognitionActive(true);
       
        
      };
   
      

      recognitionInstance.onend = () => {
        console.log('Speech Recognition Ended');
        setIsRecognitionActive(false);
      };

      return recognitionInstance;

    } catch (error) {
      console.error('Speech Recognition Setup Error:', error);
      return null;
    }
  }, [onOptionSelect]);
  useEffect(() => {
    console.log('Updated isRecognitionActive:', isRecognitionActive);
  }, [isRecognitionActive]);

  // Setup speech recognition on component mount
  useEffect(() => {
    const recognitionInstance = setupSpeechRecognition();
    
    if (recognitionInstance) {
      setRecognition(recognitionInstance);
    }

    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, [setupSpeechRecognition]);

  // Media recorder hook
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    onStart: () => {
      setTranscribedText('');
      setInterimTranscript('');
    },
    onStop: (blobUrl, blob) => {
      if (blob) {
        onRecordingComplete({
          blobUrl,
          transcribedText: transcribedTextRef.current || interimTranscript,
        });
      }
    }
    
  });

  // Start recording and speech recognition
  const handleStartRecording = () => {
    startRecording();
    if (recognition) {
      try {
        recognition.start();
        setIsRecognitionActive(true);
      } catch (error) {
        console.error('Failed to start recognition:', error);
      }
    }
  };

  // Stop recording and speech recognition
  const handleStopRecording = () => {
    stopRecording();
    if (recognition) {
      recognition.stop();
      setIsRecognitionActive(false);
    }
  };

  // Audio playback handler
  const handleAudioPlay = () => {
    if (!currentQuestion.audioUrl) {
      return;
    }
    setIsPlaying(true);
    const audio = new Audio(currentQuestion.audioUrl);
    audio.onended = () => {
      setIsPlaying(false);
    };
    audio.play().catch(error => {
      console.error('Audio playback failed:', error);
      setIsPlaying(false);
    });
  };

  // Render method for Fill in the Blank question type
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

  // Render method for Transcription question type
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

  // Render method for Read Aloud question type
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
        {(transcribedText || interimTranscript) && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg w-full">
            {transcribedText && (
              <p className="text-gray-800 font-medium">Final: {transcribedText}</p>
            )}
            {interimTranscript && (
              <p className="text-gray-600 italic">Speaking: {interimTranscript}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // Render based on question type
  if (!currentQuestion) {
    return <div className="text-center text-gray-500">No question data available</div>;
  }

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

// PropTypes for type checking
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