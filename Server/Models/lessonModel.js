import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
    required: true  
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question"
  }]
});

const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);
export default Lesson;

