import mongoose from "mongoose";

export const sectionSchema = new mongoose.Schema({
    title:{type:String,required:true},
    lessons :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Lesson"
        }
    ]
})

const Section = mongoose.models.Section || mongoose.model("Section",sectionSchema)
export default Section