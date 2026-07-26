import axios from "axios";

// const api = axios.create({
// baseURL: "https://gen-ai-job-preparation-project.onrender.com",
// withCredentials: true,
// });
const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const createResumeAPI = async (data) => {
  const response = await api.post("/api/resume/", data);
  return response.data;
};

export const getAllResumeAPI = async () =>{
    const response = await api.get("/api/resume/");
    return response.data
}

export const getResumeByIdAPI = async(resumeId) =>{
    const response = await api.get(`/api/resume/${resumeId}`);
    return response.data
}

export const deleteResumeByIdAPI = async(resumeId)=>{
  const response = await api.delete(`/api/resume/${resumeId}`)
  return response.data
}
