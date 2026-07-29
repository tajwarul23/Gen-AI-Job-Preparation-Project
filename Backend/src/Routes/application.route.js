import express from "express";
import { verifyToken } from "../Middlewares/Auth.middleware.js";
import upload from "../Middlewares/File.middleware.js";
import { applyToJobController } from "../Controllers/Application.controller.js";

const applicationRouter = express.Router();

/**
 * @route POST /api/application/:jobId
 * @description Apply to a job
 * @access Private
 */

applicationRouter.post("/:jobId", verifyToken, upload.single("resume"), applyToJobController)

export default applicationRouter;