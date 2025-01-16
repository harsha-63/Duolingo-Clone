
import express from 'express';
import { getAllSections,getSectionById,getLessonsInSection,getLessonById,getQuestionsForLesson } from '../Controllers/lessonController.js';


const lessonRouter = express.Router();  

lessonRouter
.get('/sections', getAllSections)
.get('/sections/:id', getSectionById)
.get('/sections/:id/lessons', getLessonsInSection)
.get('/lessons/:id', getLessonById)
.get('/lesson/:lessonId/questions', getQuestionsForLesson);


export default lessonRouter;


