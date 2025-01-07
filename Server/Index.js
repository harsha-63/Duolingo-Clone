import express, { Router } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './Config/db.js'
import authRouter from './Routes/authRoute.js'

dotenv.config()
const app = express();

app.use(express.json()); 
app.use(cors());
connectDB();

app.use('/auth',authRouter);

app.get('/', (req, res) => {
  res.send('API is running....');
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});