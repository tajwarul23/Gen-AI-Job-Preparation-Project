import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import { userModel } from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import { TokenBlacklistModel } from "../Models/blacklist.mode.js";
import crypto from "crypto";
import { date } from "zod";


/**
 * @name registerUserController
 * @description Register a new user, expects username, email and password from req.body
 * @access Public
 */
export const registerUserController = async (req, res) => {
  res.set({
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
});
  const { userName, email, password } = req.body;

  try {
    if (!userName || !email || !password) {
      return res.status(400).json({
        message: "Please Provide username, email and password",
        success: false,
      });
    }
    // if(!validator.isEmail(email))
    const isUserAlreadyExists = await userModel.findOne({ email
    });
    if (isUserAlreadyExists) {
        return res.status(400).json({
          message: "Account already exists with this Email",
          success: false,
        });
      
    }

    const hash = await bcrypt.hash(password, 10);

    //generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiry = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const user = await userModel.create({
      userName,
      email,
      password: hash,
      verificationToken,
      verificationTokenExpiry,
      isVerified: true,
    });

    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"?"true":"false",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

   return res.status(201).json({
      message: `Welcome to PrepLab, ${userName}! Your account has been created successfully.`,
      success: true,
      user: { id: user._id, email: user.email, userName: user.userName },
    });
  } catch (error) {
    console.log("Error in registering user", error.message);

    return res.status(500).json({
      message: "Error in registering user",
      success: false,
      err: error.message,
    });
  }
};

/**
 * @name loginUserController
 * @description Login a existing user, expects  email and password from req.body
 * @access Public
 */
export const loginUserController = async (req, res) => {
  res.set({
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
});
  const { email, password } = req.body;

 try {
   const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
      success: false,
    });
  }
  if (!user.isVerified) {
    return res.status(403).json({
      message: "Please verify your email before logging in.",
      success: false,
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
      success: false,
    });
  }

  const token = jwt.sign(
    { id: user._id, userName: user.userName },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  // res.cookie("token", token);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // false locally
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });

 return res.status(200).json({
    message: `Welcome back, ${user.userName}!`,
    success: true,
    user: { id: user._id, email: user.email, userName: user.userName },
  });
 } catch (error) {
   console.log("error in login user", error.message);
  return res.status(400).json({message:"Error logging user", success: false});
  
 }
};

/**
 * @name logoutUserController
 * @description Logout a  user, by token blacklisting and clearing his cookie
 * @access Public
 */
export const logoutUserController = async (req, res) => {
  res.set({
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
});
  try {
    const token = req.cookies.token;
    // console.log("Token = ",token);

    if (token) {
      await TokenBlacklistModel.create({ token });
    }
    if(!token){
      return res.status(400).json({ message: "No token provided", success: false });
    }
    const userName = req.user?.userName || "User";
    // res.clearCookie("token");
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });
    
    return res.status(200).json({ message: `See you later, ${userName}!`, success: true });
  } catch (error) {
    console.log("Error in logout", error.message);
    return res.status(404).json({ message: "Error logging Out", success: false });
  }
};
/**
 * @name getMeController
 * @description get the current logged in user details,
 * @access Private
 */
export const getMeController = async (req, res) => {
  res.set({
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
});
    res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
try {
    const user = await userModel.findById(req.user.id);

    if(!user){
        return res.status(404).json({message:"User not found", success:false});
    }
  return res.status(200).json({
    message: `Fetching details for ${user.userName}`,
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
    },
  });
} catch (error) {
  console.log("Error in getMeController", error.message);
  return res.status(500).json({ message: "Error Fetching user data", success: false });
}
};

/**
 * @name verifyEmail
 * @description verify the user inputted email
 * @access public
 */
export const verifyEmail = async (req, res) => {

  const { verificationToken } = req.query;
  console.log("Token received", verificationToken);

  try {
    const user = await userModel.findOne({
      verificationToken: verificationToken,
      verificationTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired verification token",
        success: false,
      });
    }

    // Mark user as verified and clear the token
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    // res.cookie("token", token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // false locally
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    await user.save();
    res.status(200).json({
      message: `Email verified successfully! You can now log in, ${user.userName}.`,
      success: true,
      user: { _id: user._id, userName: user.userName, email: user.email },
    });
  } catch (error) {
    console.log("Error in verifying email", error.message);

    res.status(500).json({
      message: "Error verifying email",
      success: false,
      err: error.message,
    });
  }
};

import admin from "../config/firebase.config.js";

export const firebaseAuthController = async (req, res) => {
  const { idToken } = req.body;
  if (!idToken)
    return res.status(400).json({ message: "ID token required", success: false });

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name } = decoded;

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        userName: name || email.split("@")[0],
        email,
        firebaseUid: uid,
        isVerified: true,
      });
    } else if (!user.firebaseUid) {
      user.firebaseUid = uid;
      user.isVerified = true;
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    return res.status(200).json({
      message: `Welcome, ${user.userName}!`,
      success: true,
      user: { id: user._id, email: user.email, userName: user.userName },
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid Firebase token", success: false });
  }
};