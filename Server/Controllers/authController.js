
import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import joiUserSchema from '../Models/joiValidation.js'
import CustomError from "../Utils/customError.js";

export const register = async (req, res) => {
    try {
      const { error } = joiUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      const { username, email, password, age } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        age,
      });
  
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json({ message: "Server error" });
    }
  };
  

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    }
const createRefreshToken = (id) => {
    return jwt.sign({ id },process.env.REFRESH_TOKEN_SECRET, {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRES_IN 
    });
}    


    export const login = async (req, res) => {
        try {
          const { email, password } = req.body;
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(400).json({ message: "no user found" });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
          }
          const accessToken = createToken(user._id);
          const refreshToken = createRefreshToken(user._id);
    
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
          });
          
          res.status(200).json({
            message: "Login successfully",
            user: {
              id: user._id,
              username: user.username,
              email: user.email,
              age: user.age,
              createdAt: user.createdAt,
              flagUrl: user.flagUrl, 
              xpPoints: user.xpPoints,            
              gems: user.gems,       
              life: user.life ,
              streak: user.streak,
              completedLessons:user.completedLessons,
              league:user.league   ,
              profileImage :user.profileImage

            },
            accessToken,
            
            
          });
          console.log("check");
          
        }
        catch (error) {
          console.error(`Error: ${error.message}`);
        }
      }

    export const logout = async (req, res) => {
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "Logout successfully" });
    }

    export const refreshingToken = async (req, res, next) => {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
        return next(new CustomError('Refresh token is required', 400));
      }
    
      try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log('Decoded Token:', decoded);  
    
        const newToken = createToken(decoded.id);
    
        res.status(200).json({  message: "Token refreshed", token: newToken });
      } catch (error) {
        console.error('Error in refreshAccessToken:', error.message, error.stack);
        next(new CustomError('Invalid or expired refresh token', 401));
      }
    };