import Language from '../Models/languageModel.js';
import CustomError from '../Utils/customError.js';  

export const getLanguages = async (req, res, next) => {
  const languages = await Language.find();
  
  if (!languages.length) {
    return next(new CustomError('No languages found', 404));
  }
  
  res.status(200).json(languages);
};
