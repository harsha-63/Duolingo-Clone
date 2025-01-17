import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [String],  
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    required: true
  }
});

const Question = mongoose.model("Question", questionSchema);
export default Question;
