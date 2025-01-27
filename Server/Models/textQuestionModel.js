import mongoose from "mongoose";


const textQuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  // question: {
  //   type: String,
  //   required: true
  // },
  // questionType: {
  //   type: String,
  //   required: true
  // },
  // isText:{
  //   type: Boolean,
  //   default: true
  // },
  // options: [{
  //   text: {
  //     type: String,
  //     required: true
  //   },
  //   isCorrect: {
  //     type: Boolean,
  //     required: true
  //   }
  // }],
  // lesson: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Lesson",
  //   required: true
  // },

});

const TextQuestion = mongoose.model("TextQuestion", textQuestionSchema);
export default TextQuestion;
