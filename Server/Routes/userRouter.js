
import express from 'express';
import { getAllSections,getSectionById,getLessonsInSection,getLessonById,getQuestionsForLesson,startLesson,resetLessonProgress,completeLesson } from '../Controllers/lessonController.js';
import { reduceLife, refillLife, rewardGems } from '../Controllers/statisticController.js';



const userRouter = express.Router();  

userRouter
.get('/sections', getAllSections)
.get('/sections/:id', getSectionById)
.get('/sections/:id/lessons', getLessonsInSection)
.get('/lessons/:id', getLessonById)
.get('/lesson/:lessonId/questions', getQuestionsForLesson)


.post('/reduce', reduceLife)
.post('/refill', refillLife)
.post('/reward', rewardGems)

.post('/lesson/start', startLesson)
.post('/lesson/complete', completeLesson)
.post('/lesson/reset', resetLessonProgress)



export default userRouter;


