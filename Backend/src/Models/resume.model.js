import mongoose from "mongoose";
const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, default: "Untitled Resume", trim: true },

    resumeUrl: { type: String },
    publicId: { type: String },
    thumbnailUrl: String,
    thumbnailPublicId: String,

    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    location: { type: String },
    portfolioUrl: { type: String },
    linkedinUrl: { type: String },
    githubProfileLink: { type: String },
    summary: { type: String },

    atsScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    rawText: {
      type: String,
    },

    typeOfResume: {
      type: String,
      enum: ["uploaded", "generated"],
      default: "generated",
    },
    experiences: {
      type: [
        {
          jobTitle: String,
          company: String,
          duration: String,
          expLocation: String,
          achievements: String,
        },
      ],
      default: [],
    },

    education: {
      type: [
        {
          degree: String,
          institution: String,
          result: String,
        },
      ],
      default: [],
    },

    skills: {
      type: [{ name: String, description: String }],
      default: [],
    },

    certifications: {
      type: [
        {
          name: String,
          issuer: String,
          issueDate: String,
          credentialUrl: String,
        },
      ],
      default: [],
    },

    projects: {
      type: [
        {
          name: String,
          githubLink: String,
          liveLink: String,
          description: String,
        },
      ],
      default: [],
    },

    isSaving: { type: Boolean, default: false },
    saveFailed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

resumeSchema.index({ user: 1, createdAt: -1 });

export const ResumeModel = mongoose.model("Resume", resumeSchema);
