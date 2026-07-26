import mongoose  from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },

    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    logoUrl:{
        type:String
    },
    aboutCompany:{
        type:String,
        trim: true,
        required: true,
        minLength:[10, "About company must be at least 50 characters"],
        maxLength:[1000, "About company cannot exceed 1000 characters"]
    },
    secret:{
        type:String,
        required: true,
        minLength:[6, "Company secret must be at least 6 characters"],
        maxLength:[20, "Company secret cannot exceed 20 characters"]
    }
}, {timestamps:true})

export const CompanyModel = mongoose.model("Company", companySchema)