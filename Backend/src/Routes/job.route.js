import express from "express";
import { authorizeRoles, verifyToken } from "../Middlewares/Auth.middleware.js";
import { createJobController } from "../Controllers/Job.controller.js";

const jobRouter = express.Router();

jobRouter.post("/create", verifyToken, authorizeRoles("company_admin", "recruiter"), createJobController)

export default jobRouter;