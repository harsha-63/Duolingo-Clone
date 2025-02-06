import CustomError from "../Utils/customError.js";

const errorManager = (err, req, res, next) => {
  try {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    next(err);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default errorManager;