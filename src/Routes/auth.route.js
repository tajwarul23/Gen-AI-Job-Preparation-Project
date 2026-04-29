import express from "express";
import { loginUserController, logoutUserController, registerUserController } from "../Controllers/Auth.controller.js";
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
 * @route GET /api/auth/logout
 * @description clear token form user cookie and add token in blacklist
 * @access Public
 */
authRouter.get("/logout", logoutUserController)


export default authRouter;