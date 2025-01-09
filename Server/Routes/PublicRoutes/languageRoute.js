import express from 'express';
import { getLanguages } from '../../Controllers/languageController.js';

import tryCatch from '../../Utils/tryCatch.js'


const languageRouter = express.Router();

languageRouter
.get('/lang', tryCatch(getLanguages)) 

export default languageRouter;