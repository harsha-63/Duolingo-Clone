// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Import database connection
import connectDb from './Config/db.js';

// Import models first
import './Models/questionModel.js';
import './Models/lessonModel.js';

// Import routes
import authRouter from './Routes/authRoute.js';
import languageRouter from './Routes/PublicRoutes/languageRoute.js';
import lessonRouter from './Routes/lessonRouter.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ 
  origin: process.env.CLIENT_URL, 
  credentials: true 
}));
app.use(cookieParser());

// Connect to database
connectDb();

// Routes
app.use('/auth', authRouter);
app.use('/public', languageRouter);
app.use('/user', lessonRouter);

app.get('/', (req, res) => {
  res.send('API is running....');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});