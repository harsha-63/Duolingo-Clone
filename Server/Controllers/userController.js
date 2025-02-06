import User from "../Models/userModel.js";
import CustomError from "../Utils/customError.js";


export const getAllUsers = async (req,res,next)=>{
    const users = await User.find({},{password:0})
    if (!users || users.length === 0) {
        return next(new CustomError("No users found", 404));
    }
    res.status(200).json({success: true,users:users});

}


export const updateUserProfile = async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }
  
      const { profileImage } = req.body;
  
      if (!profileImage) {
        return res.status(400).json({ message: "Profile image is required" });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { profileImage },
        { new: true, runValidators: true } // Ensures new data validation
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
