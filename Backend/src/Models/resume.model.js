import mongoose from "mongoose";
const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, default: "Untitled Resume" },

    resumeUrl: String,
    publicId: String,
    thumbnailUrl: String,
    thumbnailPublicId: String,

    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    portfolioUrl: { type: String, required: true },
    linkedinUrl: { type: String, required: true },
    githubProfileLink: { type: String, required: true },
    summary: { type: String, required: true },

    atsScore: { type: Number, required: true },

    experiences: [
      {
        jobTitle: String,
        company: String,
        duration: String,
        expLocation: String,
        achievements: String,
      },
    ],

    degree: String,
    university: String,

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
  },
  { timestamps: true },
);

export const ResumeModel = mongoose.model("Resume", resumeSchema);
