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
  age: {
    type: Number,
    required: true,
    min: [1, 'Age must be a positive number']
  },
  profileImage: {
    type: String,
    default: 'default-avatar.png'
  },
  life: {
    type: Number,
    default: 5,
    min: 0,
    max: 5
  },
  gems: {
    type: Number,
    default: 0
  },
  xpPoints: {
    type: Number,
    default: 100
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
  language: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Language'  
  },
  currentLesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
  },
  league: { type: String, default: 'Copper League' },
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
}, {
  timestamps: true
});

const User = mongoose.models.User|| mongoose.model('User', userSchema);

export default User;
