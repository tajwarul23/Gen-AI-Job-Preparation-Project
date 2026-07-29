import mongoose from "mongoose";
const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, default: "Untitled Resume" },

    resumeUrl: {type: String, required:true},
    publicId: {type: String, required:true},
    thumbnailUrl: String,
    thumbnailPublicId: String,

    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    location: { type: String },
    portfolioUrl: { type: String},
    linkedinUrl: { type: String },
    githubProfileLink: { type: String },
    summary: { type: String, },

    atsScore: { type: Number },

    typeOfResume:{
      type:String,
      enum:["uploaded", "generated"],
      default:"generated"
    },
    experiences: [
      {
        jobTitle: String,
        company: String,
        duration: String,
        expLocation: String,
        achievements: String,
      },
    ],

    education: [
      {
        degree: String,   
        institution: String,
        result: String,
      },
    ],

    skills: [{ name: String, description: String }],

    certifications: [
      {
        name: String,
        issuer: String,
        issueDate: String,
        credentialUrl: String,
      },
    ],

    projects: [
      {
        name: String,
        githubLink: String,
        liveLink: String,
        description: String,
      },
    ],

    isSaving:{type:Boolean, default:false},
    saveFailed:{type:Boolean, default:false},
  },
  { timestamps: true },
);

export const ResumeModel = mongoose.model("Resume", resumeSchema);
