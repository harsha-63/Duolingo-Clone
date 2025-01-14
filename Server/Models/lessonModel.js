import mongoose from 'mongoose'

export const lessonSchema = new mongoose.Schema({
    questions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question"
    }]

})

const Lesson = mongoose.models.Lesson || mongoose.model("Lesson",lessonSchema)
export default Lesson