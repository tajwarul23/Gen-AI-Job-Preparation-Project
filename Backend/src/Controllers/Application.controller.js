import { applicationModel } from "../Models/application.model.js";
import { interviewReportModel } from "../Models/interviewReport.model.js";
import { JobModel } from "../Models/job.model.js";
import { RecruiterReportModel } from "../Models/recruiterReport.model.js";
import { ResumeModel } from "../Models/resume.model.js";
import { generateRecruiterReport } from "../services/ai.service.js";
import { resumeResolveForRequest } from "../services/resolveResume.js";
import { uploadPDF } from "../services/uploadPDF.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/asyncHandler.js";

/**
 * @name applyToJobController
 * @description candidate will apply to job
 * @access Private [candidate only]
 */

export const applyToJobController = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  if (req.user.company) {
    throw new ApiError(401, "Can't apply to a job with recruiter account");
  }

  const job = await JobModel.findById(jobId).select(
    "_id company description skills",
  );

  if (!job) {
    throw new ApiError(404, "No job found");
  }

  const resume = await resumeResolveForRequest(req);

  let application;

  try {
    application = await applicationModel.create({
      candidate: req.user.id,
      job: job._id,
      resume: resume._id,
      company: job.company,
      status: "applied",
      recruiterReportStatus: "generating",
    });
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, "You have already applied for this job");
    }

    throw error;
  }

  // Send response immediately
  res
    .status(201)
    .json(new ApiResponse(201, application, "Applied to job successfully"));

  // Generate report asynchronously
  generateRecruiterReport(resume.rawText, job.description, job.skills)
    .then(async (recruiterReport) => {
      const report = await RecruiterReportModel.create({
        

        candidate: req.user.id,
        job: job._id,
        application: application._id,
        resume: resume._id,

        ...recruiterReport
      });

      await applicationModel.findByIdAndUpdate(application._id, {
        recruiterReport: report._id,
        recruiterReportStatus: "generated",
      });

      // console.log("Generated recruiter report", report);
    })
    .catch(async (error) => {
      console.error("Recruiter report generation failed:", error.message);

      await applicationModel.findByIdAndUpdate(application._id, {
        recruiterReportStatus: "failed",
      });
    });
});

/**
 * @name getCandidateAllApplicationController
 * @description candidate will get all the application details
 * @access Private [candidate only]
 */

export const getCandidateApplicationsController = async (req, res) => {
  try {
    const applications = await applicationModel.find({
      candidate: req.user.id,
    });
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          applications,
          "Fetched all application of the user",
        ),
      );
  } catch (error) {
    console.log("Error in getCandidateApplicationsController", error.message);
    throw new ApiError(
      500,
      "Something went wrong while fetching the application data",
    );
  }
};

export const getCompanyApplicationsController = async(req, res)=>{
  const applications = await applicationModel.find({company:req.user.company});
  
}