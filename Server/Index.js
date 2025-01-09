import express, { Router } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './Config/db.js'
import authRouter from './Routes/authRoute.js'
import cookieParser from 'cookie-parser'
import languageRouter from './Routes/PublicRoutes/languageRoute.js'

dotenv.config()
const app = express();

app.use(express.json()); 
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(cookieParser())
connectDb();

app.use('/auth',authRouter);
app.use('/public',languageRouter)

app.get('/', (req, res) => {
  res.send('API is running....');
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});