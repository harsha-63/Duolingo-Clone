
import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password,age } = req.body;
    const existingUser = await User.findOne({email });
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
  }
  catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({ message: "Email is already in use" });
    }
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    }
const createRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
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
        res.cookie('accessToken' , accessToken, {
            httpOnly: false,
            secure: true,
            sameSite: 'none',
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',

        }); 
        res.status(200).json({message:"Login Successfully",accessToken,refreshToken });
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

export const logout = async (req, res) => {
    res.clearCookie("refreshToken")
    res.clearCookie("accessToken")
    res.status(200).json({message:"logged out"})
}

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(403).json({ message: "Access denied, token missing!" });
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token" });
            }
            const accessToken = createToken(user.id);
            res.status(200).json({ accessToken });
        });
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
}