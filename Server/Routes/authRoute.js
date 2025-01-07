import express from 'express';
import {register,login } from '../Controllers/authController.js';

const authRouter = express.Router();


authRouter
.post('/register', register)
.post('/login', login)

export default authRouter;
