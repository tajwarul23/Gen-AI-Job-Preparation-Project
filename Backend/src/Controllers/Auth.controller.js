import bcrypt from "bcryptjs";
import { userModel } from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import { TokenBlacklistModel } from "../Models/blacklist.mode.js";

/**
 * @name registerUserController
 * @description Register a new user, expects username, email and password from req.body
 * @access Public
 */
export const registerUserController = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).json({
      message: "Please Provide username, email and password",
      success: false,
    });
  }
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ userName }, { email }],
  });
  if (isUserAlreadyExists) {
    if (isUserAlreadyExists.userName === userName)
      return res.status(400).json({
        message: "Account already exists with this userName",
        success: false,
      });
    else {
      return res.status(400).json({
        message: "Account already exists with this Email",
        success: false,
      });
    }
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    userName,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, userName: user.userName },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    success: true,
    user: { id: user._id, userName: user.userName, email: user.email },
  });
};

/**
 * @name loginUserController
 * @description Login a existing user, expects  email and password from req.body
 * @access Public
 */
export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
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

  res.cookie("token", token);

  res
    .status(200)
    .json({
      message: "User logged in successfully",
      success: true,
      user: { id: user._id, email: user.email, userName: user.userName },
    });
};

/**
 * @name logoutUserController
 * @description Logout a  user, by token blacklisting and clearing his cookie
 * @access Public
 */
export const logoutUserController = async (req, res)=>{
    const token = req.cookies.token;
    // console.log("Token = ",token);
    
    if(token){
      await TokenBlacklistModel.create({token});

    }
    res.clearCookie("token");
    res.status(200).json({message:"user logged out successfully"})
}
/**
 * @name getMeController
 * @description get the current logged in user details,
 * @access Private
 */
export const getMeController = async (req, res)=>{
    const user = await userModel.findById(req.user.id);

    res.status(200).json({message:"Fetched the user details", user:{
      id:user._id,
      userName: user.userName,
      email : user.email
    }})

}