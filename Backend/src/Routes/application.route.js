import express from "express";
import { authorizeRoles, verifyToken } from "../Middlewares/Auth.middleware.js";
import upload from "../Middlewares/File.middleware.js";
import { applyToJobController, getCandidateApplicationsController, getCompanyApplicationsController } from "../Controllers/Application.controller.js";
import { requireCompanyScope } from "../Middlewares/Role.middleware.js";

const applicationRouter = express.Router();

/**
 * @route POST /api/application/:jobId
 * @description Apply to a job
 * @access Private [candidate only]
 */

applicationRouter.post("/:jobId", verifyToken, authorizeRoles("candidate"), upload.single("resume"), applyToJobController)

/**
 * @route GET /api/application/
 * @description Get all application
 * @access Private [candidate only]
 */

applicationRouter.get("/", verifyToken, authorizeRoles("candidate"), getCandidateApplicationsController)

/**
 * @route GET/api/application/company?query [ex:GET /api/application/company?status=applied&job=687a2&page=1&limit=20&sort=newest]
 * @deprecated get all application 
 */
applicationRouter.get("/company", verifyToken, authorizeRoles("company_admin", "recruiter"), getCompanyApplicationsController)




export default applicationRouter;