import express from "express";
import { getMeController, loginUserController, logoutUserController, registerUserController,  firebaseAuthController } from "../Controllers/Auth.controller.js";
import { verifyToken } from "../Middlewares/Auth.middleware.js";
const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", registerUserController )
/**
 * @route POST /api/auth/login
 * @description Login a  user
 * @access Public
 */
authRouter.post("/login", loginUserController )

/**
 * @route POST /api/auth/logout
 * @description clear token form user cookie and add token in blacklist
 * @access Public
 */
authRouter.post("/logout",verifyToken, logoutUserController)

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access Private
 */
authRouter.get("/get-me",verifyToken,getMeController)



/**
 * @route post /api/auth/firebase
 * @description firebase authentication
 * @access Public
 */
authRouter.post("/firebase", firebaseAuthController);



export default authRouter;