import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000/api/job",
    withCredentials:true
});

export const createJobApi = async(formData)=>{
    const response = await api.post("/create", formData);
    return response.data;
}

export const getCompanyJobFeedApi = async()=>{
    const response = await api.get("/company");
    return response.data;
}

export const getCandidateJobFeedApi = async()=>{
    const response = await api.get("/");
    return response.data;
}

export const updateJobApi = async(jobId)=>{
    const response = await api.patch(`/${jobId}`);
    return response.data;
}

export const deleteJobApi = async(jobId)=>{
    const response = await api.delete(`/${jobId}`);
    return response.data;
}

export const generateJobDescriptionApi = async(formData)=>{
    const response = await api.post(formData);
    return response.data;
}