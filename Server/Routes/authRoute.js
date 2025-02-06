import express from 'express';
import {register,login, refreshingToken } from '../Controllers/authController.js';

const authRouter = express.Router();


authRouter
.post('/register', register)
.post('/login', login)
.post('/refreshToken',refreshingToken)
export default authRouter;
