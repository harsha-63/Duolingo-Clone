import User from "../Models/userModel.js";


export const getAllUsers = async (req,res,next)=>{
    const users = await User.find({},{password:0})
    if (!users || users.length === 0) {
        return next(new CustomError("No users found", 404));
    }
    res.status(200).json({success: true,users:users});

}