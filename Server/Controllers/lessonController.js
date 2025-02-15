//SECTION FUNCTIONALITIES
import Section from "../Models/sectionModel.js";
import Lesson from "../Models/lessonModel.js";
import mongoose from "mongoose";
import User from "../Models/userModel.js";
import TextQuestion from "../Models/textQuestionModel.js";
import AudioQuestion from "../Models/audioModel.js";

//get all sections
export const getAllSections = async (req, res) => {
  try {
    const sections = await Section.find();
    res.status(200).json(sections);
  } catch (error) {
    console.error(`Error fetching sections: ${error.message}`);
    res.status(500).json({ message: "Failed to fetch sections" });
  }
};

//get section by id
export const getSectionById = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    res.status(200).json(section);
  } catch (error) {
    console.error(`Error fetching section: ${error.message}`);
    res.status(500).json({ message: "Failed to fetch section" });
  }
};


//LESSON FUNCTIONALITIES
//get all lessons
export const getLessonsInSection = async (req, res) => {
  try {
    const { id } = req.params; 
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid section ID" });
    }
    const lessons = await Lesson.find({ section: id });
    console.log(lessons);
    if (!lessons.length) {
      return res.status(404).json({ message: "No lessons found for this section" });
    }
    res.status(200).json(lessons);
  } catch (error) {
    console.error(`Error fetching lessons: ${error.message}`);
    res.status(500).json({ message: "Failed to fetch lessons" });
  }
};

//get lesson by id
export const getLessonById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid lesson ID' });
    }
    const lesson = await Lesson.findById(id)
 
    res.status(200).json(lesson);
  } catch (error) {
    console.error(`Error fetching lesson: ${error.message}`);
    res.status(500).json({ message: 'Failed to fetch lesson' });
  }
};

export const getQuestionsForLesson = async (req, res) => {
 
  try {
    const { lessonId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      return res.status(400).json({ message: 'Invalid lesson ID' });
    }
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.status(200).json(lesson.questions);
  } catch (error) {
    console.error(`Error fetching questions: ${error.message}`);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
};


export const startLesson = async (req, res) => {
  const { userId, lessonId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.currentLesson = lessonId;
    await user.save();

    res.status(200).json({
      message: 'Lesson started',
      currentLesson: lessonId
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const isText = req.query.isText === 'true';


    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid question ID' });
    }
    if(isText){
      const question = await TextQuestion.findById(id);
      res.status(200).json(question);
    }else{
      const question = await AudioQuestion.findById(id);
      res.status(200).json(question);
    }
    
  } catch (error) {
    console.error(`Error fetching question: ${error.message}`);
    res.status(500).json({ message: 'Failed to fetch question' });
  }
};

export const completeLesson = async (req, res) => {
  const { userId, lessonId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.completedLessons.includes(lessonId)) {
      return res.status(400).json({ message: 'Lesson already completed' });
    }
    user.completedLessons.push(lessonId);
    await user.save();
    res.status(200).json({
      message: 'Lesson completed',
      completedLessons: user.completedLessons,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const resetLessonProgress = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.currentLesson = null;
    await user.save();

    res.status(200).json({
      message: 'Lesson progress reset'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




