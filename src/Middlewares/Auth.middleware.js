import jwt from "jsonwebtoken";
import { TokenBlacklistModel } from "../Models/blacklist.mode.js";

export const verifyToken = async(req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }
  const isTokenBlackListed = await  TokenBlacklistModel.findOne({token});
  if(!isTokenBlackListed){
    return res.status(401).json({message:"Token is blacklisted. Please login again."})
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
