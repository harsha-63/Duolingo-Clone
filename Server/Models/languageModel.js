import mongoose from 'mongoose';

 export const languageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  flag: { type: String, required: true },
  users: { type: String, required: true }  
});

const Language = mongoose.models.Language||mongoose.model('Language', languageSchema);
export default Language;