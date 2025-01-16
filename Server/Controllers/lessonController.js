//SECTION FUNCTIONALITIES
import Section from "../Models/sectionModel.js";
import Lesson from "../Models/lessonModel.js";

//get all sections

export const getAllSections = async (req, res) => {
  try {
    const sections = await Section.find().populate('lessons');
    console.log(sections); // Log the sections data
    console.log(sections[0].lessons); // Log the lessons data
    res.status(200).json(sections);

  } catch (error) {
    console.error(`Error fetching sections: ${error.message}`);
    res.status(500).json({ message: "Failed to fetch sections" });
  }
};


//get section by id

export const getSectionById = async (req, res) => {
try {
    const section = await Section.findById(req.params.id).populate('lessons');
    if (!section) {
    return res.status(404).json({ message: 'Section not found' });
    }
    res.status(200).json(section);
} catch (error) {
    console.error(`Error fetching section: ${error.message}`);
    res.status(500).json({ message: "Failed to fetch section" });
}
};

// //create section

// export const createSection = async (req, res) => {
// try {
//     const section = await Section.create(req.body);
//     res.status(201).json(section);
// }
// catch (error) {
//     console.error(`Error creating section: ${error.message}`);
//     res.status(500).json({ message: "Failed to create section" });
// }
// }

//LESSON FUNCTIONALITIES

//get all lessons
import mongoose from "mongoose";

export const getLessonsInSection = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Section ID:", id);  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid section ID" });
    }
    const lessons = await Lesson.find({ section: id })
    console.log(lessons)
    if (!lessons.length) {
      return res.status(404).json({ message: "No lessons found for this section" });
    }
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lessons" });
  }
};


//get lesson by id
export const getLessonById = async (req, res) => {
    try {
      const lesson = await Lesson.findById(req.params.id).populate('questions'); 
      
      if (!lesson) {
        return res.status(404).json({ message: 'Lesson not found' });
      }
      res.status(200).json(lesson);
    } catch (error) {
      console.error(`Error fetching lesson: ${error.message}`);
      res.status(500).json({ message: "Failed to fetch lesson" });
    }
  };
  





export const getQuestionsForLesson = async (req, res) => {
  const { lessonId } = req.params;

  try {
    const lesson = await Lesson.findById(lessonId).populate('questions');

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    console.log(lesson);
    console.log(lesson.questions);

    res.status(200).json(lesson.questions);
  } catch (error) {
    console.error(`Error fetching questions: ${error.message}`);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
};

