import jwt from "jsonwebtoken";
import CustomError from "../Utils/customError.js";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(new CustomError("Unauthorized", 401));
    }
    if (authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return next(new CustomError("Unauthorized", 401));
        }
        req.user = user;
        next();
      });
    } else {
      return next(new CustomError("Unauthorized", 401));
    }
  } catch (error) {
    next(error);
  }
};

export default verifyToken;