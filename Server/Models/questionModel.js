
import mongoose from "mongoose";

export const questionSchema = new mongoose.Schema({
    questionText:{
        type:String,required:true
    },
    options:{
        type:[String],
        required:true
    },
    correctAnswer:{
        type:String,
        required:true

    },
    lesson:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Lesson"
    }
})

const Question = mongoose.models.Question || mongoose.model("Question",questionSchema)