import { applicationModel } from "../Models/application.model.js";
import { JobModel } from "../Models/job.model.js";
import { ResumeModel } from "../Models/resume.model.js";
import { uploadPDF } from "../services/uploadPDF.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/asyncHandler.js";

export const applyToJobController = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const userName = req.user.userName;
  const job = await JobModel.findById(jobId).select("_id company");
  if (req.user.company) {
    throw new ApiError(401, "Can't apply to a job with recruiter account");
  }
  if (!job) {
    throw new ApiError(404, "No job found");
  }
  
  if (!req.body.resumeId && !req.file) {
    throw new ApiError(401, "Select or Upload a resume");
  }
  let dbResume;
  if (req.body.resumeId) {
    const resume = await ResumeModel.findById(req.body.resumeId).select(
      "user _id",
    );
    if (!resume) throw new ApiError(401, "No Resume found");
    if (String(resume.user) !== req.user.id) {
      throw new ApiError(404, "Unauthorize access of resume");
    }
    dbResume = resume._id;
  } else if (req.file) {
    if (req.file.mimetype !== "application/pdf") {
      throw new ApiError(400, "Only PDF resumes are allowed");
    }

    const upload = await uploadPDF(
      req.file.buffer,
      null,
      `Resume of ${userName}`,
    );
    if (!upload.resumeUrl || !upload.publicId) {
      throw new ApiError(501, "Error uploading resume");
    }
    const uploadedResume = await ResumeModel.create({
    
      user: req.user.id,
      resumeUrl: upload.resumeUrl,
      publicId: upload.publicId,
      typeOfResume: "uploaded",
      title: `Resume of ${req.user.userName}`
    });
    dbResume = uploadedResume._id;
  }

  try {
    const application = await applicationModel.create({
    candidate: req.user.id,
    job: job._id,
    resume: dbResume,
    company: job.company,
    status: "analyzing",
  });
  return res
    .status(201)
    .json(new ApiResponse(201, application, "Applied to job successfully"));
  } catch (error) {
    if(error.code === 11000){
        throw new ApiError(409, "You have already applied for this job")
    }
    throw new ApiError(501, "Something went wrong while applying")
  }

  
});

