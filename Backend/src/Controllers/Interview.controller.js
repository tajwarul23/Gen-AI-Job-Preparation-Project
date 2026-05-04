import pdfParse from "pdf-parse-new";
import { generateInterviewReport } from "../services/ai.service.js";
import { interviewReportModel } from "../Models/interviewReport.model.js";

/**
 * @description Controller to generate interview report base on user selfDescription jobDescription resume
 */
export const generateInterviewReportController = async (req, res) => {
  try {
    if(!req.file){
      return res.status(400).json({ message: "Resume file is required" });
    }
    const resumeData = await pdfParse(req.file.buffer);
    const resumeContent = resumeData.text;
    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({
      resume: resumeContent,
      selfDescription: selfDescription,
      jobDescription: jobDescription,
    });

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeContent,
      selfDescription,
      jobDescription,
      ...interviewReportByAi,
    });

    res
      .status(201)
      .json({ message: "Interview Report Generated successfully", interviewReport });
  } catch (error) {
    console.log("Error in generateInterviewReportController", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @description  Controller to get interview report by interviewId
 */
export const getInterviewReportByIdController = async(req, res)=>{

  const {interviewId} = req.params;
  try {
    const interviewReport = await interviewReportModel.findOne({_id:interviewId, user:req.user.id});
    if(!interviewReport){
      return res.status(404).json({message:"Interview Report not found"})
    }
    res.status(200).json({
      message:"Interview report fetched successfully",
      interviewReport
    })
  } catch (error) {
   console.log("error in generateInterviewReportByIdController", error.message);
    
  }
}

/**
 * @description Controller to get all the interview report of the logged in user
 * 
 */
export const getAllInterviewReportController = async(req, res)=>{
  try {
    const allReport = await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("title _id")
    if(!allReport){
      return res.status(404).json({message:"No reports found"})
    }
    return res.status(200).json({message:"Fetched all interviewReport", allReport})
  } catch (error) {
    console.log("Error in getAllInterviewReportController", error.message);
    
  }
}