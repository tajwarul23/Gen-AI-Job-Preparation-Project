import mongoose from "mongoose";


const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "technical question is required"],
    },
    intention: { type: String, required: [true, "intention is required"] },
    answer: { type: String, required: [true, "answer is required"] },
  },
  { _id: false },
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "technical question is required"],
    },
    intention: { type: String, required: [true, "intention is required"] },
    answer: { type: String, required: [true, "answer is required"] },
  },
  { _id: false },
);

const skillGapsSchema = new mongoose.Schema(
  {
    skill: { type: String, required: [true, "skill is required"] },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "severity is required"],
    },
  },
  { _id: false },
);

const strengthSchema = new mongoose.Schema({
  skill: {type: String, required:[true, "Skill is required"]},

});

const preparationPlanSchema = new mongoose.Schema({
  day: { type: Number, required: [true, "Day Number is required"] },
  focus: { type: String, required: [true, "focus is required"] },
  tasks: [{ type: String, required: [true, "Task is required"] }], //task is a array of string
});
const interviewReportSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "title is required"] },
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },
    resume: { type: String },
    selfDescription: { type: String },
    matchScore: { type: Number, min: 0, max: 100 },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapsSchema],
    strengths:[strengthSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
   
  },
  { timestamps: true },
);

export const interviewReportModel = mongoose.model(
  "interviewReports",
  interviewReportSchema,
);
