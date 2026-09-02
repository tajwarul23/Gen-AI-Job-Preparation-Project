import { NotificationModel } from "../Models/notification.model.js"

export const createNotification = async({recipient, type, title, message}) =>{

    try {
        await NotificationModel.create({recipient, type, title, message});
    } catch (error) {
        console.log(`Error creating notification for ${message}`);
        
    }

}