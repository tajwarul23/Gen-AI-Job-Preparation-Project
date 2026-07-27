import mongoose  from "mongoose";

const companySchema = new mongoose.Schema({
    companyName: {
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
    country:{
        type: String,
        required: true,
    },
    industry: {
    type: String,
    enum: [
        "TECHNOLOGY",
        "FINANCE",
        "HEALTHCARE",
        "EDUCATION",
        "E_COMMERCE",
        "MARKETING",
        "CONSULTING",
        "REAL_ESTATE",
        "MANUFACTURING",
        "LOGISTICS",
        "TELECOMMUNICATION",
        "MEDIA",
        "GOVERNMENT",
        "NON_PROFIT",
        "OTHER"
    ],
    required: true
},
  
}, {timestamps:true})

export const CompanyModel = mongoose.model("Company", companySchema)