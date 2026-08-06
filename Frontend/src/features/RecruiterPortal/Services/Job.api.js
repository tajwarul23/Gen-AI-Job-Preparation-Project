import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000/api/job",
    withCredentials:true
});

export const createJobApi = async(data)=>{
    const response = await api.post("/create", data);
    return response.data;
}

export const getCompanyJobFeedApi = async()=>{
    const response = await api.get("/company");
    return response.data;
}

// move this to candidate portal
export const getCandidateJobFeedApi = async()=>{
    const response = await api.get("/");
    return response.data;
}

export const updateJobApi = async(jobId, data)=>{
    const response = await api.patch(`/${jobId}`, data);
    return response.data;
}

export const deleteJobApi = async(jobId)=>{
    const response = await api.delete(`/${jobId}`);
    return response.data;
}

export const generateJobDescriptionApi = async(data)=>{
    const response = await api.post("/generate-description", data);
    return response.data;
}