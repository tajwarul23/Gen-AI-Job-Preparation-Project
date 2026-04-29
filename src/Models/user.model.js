import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        unique: [true, "username already taken"],
        required: true
    },
    email:{
        type:String,
        unique:[true, "Account already exists with this email address"],
        required: true
    },
    password:{
        type:String,
        required:true
    }
})

export const userModel = mongoose.model("users", userSchema)