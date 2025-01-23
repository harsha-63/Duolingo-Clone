import mongoose from "mongoose";

const audioQuestionSchema = new mongoose.Schema({
  questionType: {
    type: String,
    enum: ["fill-in-the-blank", "transcription", "read-aloud"], 
    required: true,
  },
  audioUrl: {
    type: String,
    required: true, 
  },
  sentence: {
    type: String,
    required: true, 
  },
  correctAnswer: {
    type: mongoose.Schema.Types.Mixed, 
    required: true,
  },
  replayLimit: {
    type: Number,
    default: 3, 
  },

});

const AudioQuestion = mongoose.model("AudioQuestion", audioQuestionSchema);

export default AudioQuestion;
