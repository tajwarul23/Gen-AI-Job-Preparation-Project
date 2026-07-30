import PdfParse from "pdf-parse-new"
import ApiError from "../Utils/ApiError.js"
import { uploadPDF } from "./uploadPDF.js"
import { ResumeModel } from "../Models/resume.model.js"

export const uploadResume = async({file, user}) =>{
  if(!file){
        throw new ApiError(400, "Resume file is required")
    }

    if(file.mimetype !== "application/pdf"){
        throw new ApiError(400, "Only pdf resumes are allowed")
    }

    const resumeText = await PdfParse(file.buffer);
    const rawText = resumeText?.text;
    if(!rawText.trim()){
        throw new ApiError(400, "Unable to extract text from resume");
    }


    const upload = await uploadPDF(file.buffer, null, `Resume of ${user.userName}`);

    if(!upload.resumeUrl || !upload.publicId){
        throw new ApiError(500, "Failed to upload resume")
    }

    const resume = await ResumeModel.create({
        user: user.id,
        title:`Resume of ${user.userName}`,
        resumeUrl: upload.resumeUrl,
        publicId: upload.publicId,
        rawText,
        typeOfResume:"uploaded"
    })

    return resume;
}