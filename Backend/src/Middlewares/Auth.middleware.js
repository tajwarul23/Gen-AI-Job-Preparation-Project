import jwt from "jsonwebtoken";
import { TokenBlacklistModel } from "../Models/blacklist.mode.js";
import { userModel } from "../Models/user.model.js";

export const verifyToken = async(req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Please Login to visit the page" });
  }
  const isTokenBlackListed = await  TokenBlacklistModel.findOne({token});
  if(isTokenBlackListed){
    return res.status(401).json({message:"Token is blacklisted. Please login again."})
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("_id role company email userName")
    if(!user){
      return res.status(401).json({
        message: "User no longer exists",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in auth middleware");
    
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export const authorizeRoles = (...allowedRoles)=>{
  return (req,res,next)=>{
    if(!req.user || !allowedRoles.includes(req.user.role)){
      return res.status(403).json({ message: "You are not authorized to access this resource" });
    }
    next();
  }
}