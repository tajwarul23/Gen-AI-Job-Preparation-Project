import pdfParse from "pdf-parse-new";
import { generateInterviewReport } from "../services/ai.service.js";
import { interviewReportModel } from "../Models/interviewReport.model.js";
import mongoose from "mongoose";

/**
 * @description Controller to generate interview report base on user's selfDescription,jobDescription & resume
 */
export const generateInterviewReportController = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Resume file is required", success: false });
    }
    const resumeData = await pdfParse(req.file.buffer);
    if (!resumeData) {
      return res.status(400).json({
        message: "Please re-upload the PDF file and Try again later..!",
        success: false,
      });
    }
    const resumeContent = resumeData.text;
    const { selfDescription, jobDescription } = req.body;
    if (!selfDescription || !jobDescription) {
      return res.status(400).json({
        message: "Self description and job description are required",
        success: false,
      });
    }

    const interviewReportByAi = await generateInterviewReport({
      resume: resumeContent,
      selfDescription: selfDescription,
      jobDescription: jobDescription,
    });

    if (!interviewReportByAi) {
      return res.status(400).json({
        message: "Failed to generate interview report. Please try again later",
        success: false,
      });
    }
    const interviewReport = await interviewReportModel.create({
      source:"external_job",
      user: req.user.id,
      resume: resumeContent,
      selfDescription,
      jobDescription,
      ...interviewReportByAi,
    });

    return res.status(201).json({
      message: "Interview Report Generated successfully",
      interviewReport,
      success: true,
    });
  } catch (error) {
    console.log("Error in generateInterviewReportController", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

/**
 * @description  Controller to get interview report by interviewId
 */
export const getInterviewReportByIdController = async (req, res) => {
  const { interviewId } = req.params;
  if (!interviewId || !mongoose.Types.ObjectId.isValid(interviewId)) {
    console.log("Invalid ID", interviewId);
    
    return res
      .status(400)
      .json({ message: "Invalid Interview ID", success: false });
  }
  try {
    const interviewReport = await interviewReportModel.findOne({
      _id: interviewId,
      user: req.user.id,
    });
    if (!interviewReport) {
      return res
        .status(404)
        .json({ message: "Interview Report not found", success: false });
    }
    return res.status(200).json({
      message: "Interview report fetched successfully",
      interviewReport,
      success: true,
    });
  } catch (error) {
    console.log(
      "error in generateInterviewReportByIdController",
      error.message,
    );
    return res
      .status(500)
      .json({ message: "Error in getting interview report", success: false });
  }
};

/**
 * @description Controller to get all the interview report of the logged in user
 *
 */
export const getAllInterviewReportController = async (req, res) => {
  try {
    const allReport = await interviewReportModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 });
    return res.status(200).json({
      message: allReport.length
        ? "Fetched all interview reports"
        : "No reports found",
      allReport,
      success: true,
    });

   
  } catch (error) {
    console.log("Error in getAllInterviewReportController", error.message);
    return res
      .status(500)
      .json({ message: "Error in getting interview report", success: false });
  }
};
