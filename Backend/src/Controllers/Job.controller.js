/**
 * @name createJobController
 * @description RECRUITER only, creating job opening
 * @access Private
 */

import { CompanyModel } from "../Models/company.model.js";
import { JobModel } from "../Models/job.model.js";
import { userModel } from "../Models/user.model.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/asyncHandler.js";

export const createJobController = asyncHandler(async (req, res) => {
  const dbUser = await userModel.findById(req.user.id);
  if (!dbUser) {
    throw new ApiError(404, "User not found");
  }
  if (!dbUser.company) {
    throw new ApiError(400, "You must belong to a company to post a job.");
  }
  const dbCompany = await CompanyModel.findById(dbUser.company);
  if (!dbCompany) {
    throw new ApiError(404, "Company not found.");
  }
  const {
    title,
    description,
    skills,
    location,
    workMode,
    employmentType,
    experienceLevel,
    salary,
    status,
    expiresAt,
    

  } = req.body;

  if (
    !title?.trim() ||
    !description?.trim() ||
    !location?.trim() ||
    !workMode?.trim() ||
    !employmentType?.trim() ||
    !experienceLevel?.trim() ||
    !status?.trim() ||
    !salary ||
    !expiresAt ||
    !Array.isArray(skills) ||
    skills.length === 0
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const createdJob = await JobModel.create({
    title,
    description,
    skills,
    location,
    workMode,
    employmentType,
    experienceLevel,
    salary,
    status,
    expiresAt,
    postedBy:dbUser._id,
    company:dbCompany._id
  });

  return res
    .status(201)
    .json(new ApiResponse(201, createdJob, "Job posted successfully"));
});
