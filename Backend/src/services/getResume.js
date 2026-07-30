import mongoose from "mongoose"
import ApiError from "../Utils/ApiError.js"
import { ResumeModel } from "../Models/resume.model.js";

export const getResume = async(resumeId, userId) =>{
     if(!mongoose.isValidObjectId(resumeId)){
        throw new ApiError(400, "Invalid resume id");
    }

    const resume = await ResumeModel.findById(resumeId);

    if(!resume){
        throw new ApiError(404, "Resume not found")
    }

    if(String(userId) !== String(resume.user)){
        throw new ApiError(403, "Unauthorized access of resume")
    }

    return resume
}