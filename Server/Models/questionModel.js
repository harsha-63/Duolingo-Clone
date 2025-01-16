import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [String],  // An array of strings
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

const Question = mongoose.models.Question || mongoose.model("Question", questionSchema);
export default Question;
