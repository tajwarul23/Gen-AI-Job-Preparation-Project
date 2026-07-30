import express from "express";
import { authorizeRoles, verifyToken } from "../Middlewares/Auth.middleware.js";
import upload from "../Middlewares/File.middleware.js";
import { applyToJobController, getCandidateApplicationsController } from "../Controllers/Application.controller.js";

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


export default applicationRouter;