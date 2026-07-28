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

/**
 * @name createJobController
 * @description Recruiter post job opening
 * @access Private [company_admin || recruiter]
 */

export const createJobController = asyncHandler(async (req, res) => {
  const dbUser = await userModel.findById(req.user.id);
  if (!dbUser) {
    throw new ApiError(404, "User not found");
  }
  if (!dbUser.company) {
    throw new ApiError(400, "You must belong to a company to post a job.");
  }
  const dbCompany = await CompanyModel.findById(dbUser.company).select(
    "companyName",
  );
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
    vacancy,
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
  const normalizedTitle = title.trim().toLowerCase();
  const existedJob = await JobModel.findOne({ normalizedTitle });
  if (existedJob) {
    throw new ApiError(401, "This job was already created..");
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
    vacancy,
    normalizedTitle,
    postedBy: dbUser._id,
    company: dbCompany._id,
    companyName: dbCompany.companyName,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, createdJob, "Job posted successfully"));
});

/**
 * @name createJobController
 * @description Job feed for all candidate
 * @access Private
 */
export const getJobFeedController = asyncHandler(async (req, res) => {
  const {
    limit = 20,
    cursor,
    q,
    location,
    workMode,
    employmentType,
    experienceLevel,
  } = req.query;

  const pageSize = Math.min(Number(limit), 50);

  const query = { status: "OPEN" };

  // Cursor pagination

  if (cursor) {
    let decodedCursor;
    try {
      decodedCursor = JSON.parse(cursor);
    } catch (error) {
      throw new ApiError(400, "Invalid cursor");
    }
    const { createdAt, id } = decodedCursor;

    if (!createdAt || !id) {
      throw new ApiError(400, "Invalid Cursor");
    }
    query.$or = [
      {
        createdAt: {
          $lt: new Date(createdAt),
        },
      },

      {
        createdAt: new Date(createdAt),

        _id: {
          $lt: id,
        },
      },
    ];
  }

  //search
  if (q && q.trim()) {
    const searchTerm = q.trim().replace(/\s+/g, "");
    query.$text = {
      $search: q.trim(),
    };
  }

  //filters
  if (location) {
    query.location = {
      $regex: location,

      $options: "i",
    };
  }

  if (workMode) {
    query.workMode = workMode.toUpperCase();
  }

  if (employmentType) {
    query.employmentType = employmentType.toUpperCase();
  }

  if (experienceLevel) {
    query.experienceLevel = experienceLevel.toUpperCase();
  }

  const [jobs, totalCounts] = await Promise.all([
    JobModel.find(query)
      .sort({
        createdAt: -1,
        _id: -1,
      })
      .limit(pageSize + 1)
      .lean(),

    JobModel.countDocuments(query),
  ]);

  const hasMore = jobs.length > pageSize;

  const results = hasMore ? jobs.slice(0, pageSize) : jobs;

  let nextCursor = null;
  if (hasMore) {
    const lastJob = results[results.length - 1];
    nextCursor = JSON.stringify({
      createdAt: lastJob.createdAt,
      id: lastJob._id,
    });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { total: totalCounts, jobs: results, nextCursor, hasMore },
        "Fetched Job Successfully",
      ),
    );
});
