import ApiError from "../Utils/ApiError.js";
import { getResume } from "./getResume.js";
import { uploadResume } from "./uploadResume.js";

export const resumeResolveForRequest = async(req) =>{
     const { resumeId } = req.body || {};

    if(resumeId){
        return await getResume(resumeId, req.user.id)
    }

    if(req.file){
        return await uploadResume({file: req.file, user: req.user})
    }

    throw new ApiError(400, "Please select an existing resume or upload a new resume")
}