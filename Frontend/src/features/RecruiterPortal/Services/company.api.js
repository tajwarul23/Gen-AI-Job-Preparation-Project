import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/company",
    withCredentials:true
});

export const createCompanyApi = async(formData) =>{
    const response = await api.post("/create", formData)
    return response.data;
}

export const generateInvitationLinkApi = async()=>{
    const response = await api.post("/invite");
    return response.data;
}

export const inviteByEmailApi = async(email)=>{
    const response = await api.post("/invite-email", { email });
    return response.data;
}

export const joinCompanyApi = async(token)=>{
    const response = await api.post(`/join?token=${token}`);
    return response.data;
}

export const updateCompanyInfoApi = async (data)=>{
    const response = await api.patch("/update", data);
    return response.data;
}

export const updateCompanyLogoApi = async(formData)=>{  
    const response = await api.patch("/updateLogo", formData);
    return response.data;
}

export const getCompanyApi = async ()=>{
    const response = await api.get("/");
    return response.data;
}