import express from "express";
import { createCompanyController, generateInviteController, getCompanyController, inviteByEmailController, joinCompanyController, updateCompanyController, updateCompanyLogoController } from "../Controllers/Company.controller.js";
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

/**
 * @route POST /api/company/invite-email
 * @description generate an invite link and email it directly to a recruiter
 * @access Private [only company admin]
 */
companyRouter.post("/invite-email", verifyToken, authorizeRoles("company_admin"), inviteByEmailController)

/**
 * @route POST /api/company/update
 * @description update company info
 * @access Private [only company admin]
 */
companyRouter.patch("/update", verifyToken, authorizeRoles("company_admin"), updateCompanyController)
/**
 * @route POST /api/company/updateLogo
 * @description update company logo
 * @access Private [only company admin]
 */
companyRouter.patch("/updateLogo", verifyToken, authorizeRoles("company_admin"),upload.single("logo"), updateCompanyLogoController)

/**
 * @route GET /api/company/
 * @description get company info
 * @access Private [company_admin || recruiter]
 */
companyRouter.get("/", verifyToken, authorizeRoles("company_admin", "recruiter"), getCompanyController)

export default companyRouter;