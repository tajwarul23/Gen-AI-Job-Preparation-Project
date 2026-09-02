import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/notification",
    withCredentials: true
});

export const getNotificationApi = async({cursor, limit = 15} = {})=>{
    const params = {limit};
    if(cursor) params.cursor = cursor

    const response = await api.get("/", {params});
    return response.data;
}

export const getUnreadNotificationCountApi = async()=>{
    const response = await api.get("/unread-count");
    return response.data;
}

export const markAllNotificationReadApi = async()=>{
    const response = await api.patch("/read-all");
    return response.data;
}

export const markNotificationReadApi = async(notificationId)=>{
    const response = await api.patch(`/${notificationId}/read`);
    return response.data;
}

export const clearAllNotificationApi = async ()=>{
    const response = await api.delete("/");
    return response.data;
}