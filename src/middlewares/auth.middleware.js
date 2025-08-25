import { asyncHandler } from "../utils/asynchandler.js";
import { User } from "../models/users.models.js";
import  jsonWebToken  from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
const jwt = jsonWebToken;

const verifyjwt = asyncHandler (async (req,res,next)=>{
    
    try {
           // first look for the refershTOken in the cookie
           const token = req.cookies?.accessToken || req.headers.authorization?.replace('Bearer ', '');
           if(!token){
            throw new ApiError(401,'Unauthorized request')
           }
           // then verify if the user is in the database or not
           const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
           if(!decodedToken){
             throw new ApiError(401,'Unauthorized request')
           }
           const user = await User.findById(decodedToken.id).select("-password -refreshToken");
           if(!user){
             throw new ApiError(401,'User not found in database')
           }
    
            
           // inject the user key in the request body
    
           req.user = user;
    
           next();
    } catch (err) {
       if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Access token expired",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Unauthorized request",
  });
    }
      
})

export {verifyjwt};