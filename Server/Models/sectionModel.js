import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  title: { type: String, required: true },
  color: {
    type: String,
    default: 'bg-lemongreen', 
  },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }]
});

const Section = mongoose.models.Section || mongoose.model("Section", sectionSchema);
export default Section;
