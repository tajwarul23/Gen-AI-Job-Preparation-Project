import express from "express";
import { createCompanyController, generateInviteController, joinCompanyController } from "../Controllers/Company.controller.js";
import { authorizeRoles, verifyToken } from "../Middlewares/Auth.middleware.js";
import upload from "../Middlewares/File.middleware.js";

const companyRouter = express.Router();

/**
 * @route POST /api/company/create
 * @description Create a new company
 * @access Private
 */
companyRouter.post("/create", verifyToken, upload.single("logo"), createCompanyController )
/**
 * @route POST /api/company/join
 * @description Join a  company
 * @access Private
 */
companyRouter.post("/join", verifyToken,  joinCompanyController )
/**
 * @route POST /api/company/invite
 * @description invite a user as a recruiter
 * @access Private [only company admin]
 */
companyRouter.post("/invite", verifyToken, authorizeRoles("company_admin"), generateInviteController)



export default companyRouter;