import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
    required: true  
  },
  questions: [{
   id: { type: String, required: true },
   isText: { type: Boolean, required: true },
  }]
});

const Lesson = mongoose.model("Lesson", lessonSchema);
export default Lesson;

