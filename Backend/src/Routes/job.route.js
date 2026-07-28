import express from "express";
import { authorizeRoles, verifyToken } from "../Middlewares/Auth.middleware.js";
import { createJobController, getCompanyJobFeedController, getJobFeedController } from "../Controllers/Job.controller.js";

const jobRouter = express.Router();

/**
 * @route POST /api/job/create
 * @description post a job opening
 * @access Private [company_admin || recruiter]
 */
jobRouter.post("/create", verifyToken, authorizeRoles("company_admin", "recruiter"), createJobController);


/**
 * @route GET /api/job
 * @description Get all open job opening
 * @access Private [for all user]
 */
jobRouter.get("/", verifyToken, getJobFeedController)

/**
 * @route GET /api/job/company
 * @description Get all jobs for specific company
 * @access Private [company_admin || recruiter]
 */
jobRouter.get("/company", verifyToken, authorizeRoles("company_admin", "recruiter"), getCompanyJobFeedController)

export default jobRouter;