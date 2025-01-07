import CustomError from "../Utils/customError.js";
import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if (authHeader) {
          const token = authHeader.split(" ")[1];
          jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
            if (err) {
              throw new CustomError("Token is not valid", 401);
            }
            req.user = user;
            next();
          });
        } else {
          next(new CustomError("You are not authenticated", 401));
        }
    }
    catch(error){
        next(error);
    }
}
