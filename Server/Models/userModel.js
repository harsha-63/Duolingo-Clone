import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot be longer than 30 characters']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  profileImage: {
    type: String,
    default: 'default-avatar.png'
  },
  level: {
    type: Number,
    default: 1,
    min: 1,
    max: 100
  },
  lessonsCompleted: {
    type: Number,
    default: 0
  },
  xpPoints: {
    type: Number,
    default: 0
  },
  currentLesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
  },
  streak: {
    type: Number,
    default: 0
  },
  completedLessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  achievements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement'
  }],
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, {
  timestamps: true
});

const User = mongoose.models.User|| mongoose.model('User', userSchema);

export default User;
