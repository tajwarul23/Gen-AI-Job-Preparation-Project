import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/application",
    withCredentials:true
})

export const getAllApplicationForCompanyApi = async()=>{
    const response = await api.get("/company");
    return response.data;
}

export const updateApplicationStatusApi = async(applicationId)=>{
    const response = await api.patch(`/${applicationId}`);
    return response.data;
}