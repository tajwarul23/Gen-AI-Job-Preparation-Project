import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title:{
    type:String,
    required:true,
  },
  description: { type: String, required: true },

   requirements: [{ type: String }],

   location: { type: String },

    employmentType: {
    type: String,
    enum: ["full_time", "part_time", "contract", "internship"],
    default: "full_time",
  },

    role:{
        type:String,
        enum:["Senior", "Mid", "Junior",],
        default:"Junior"
    },

    status: {
    type: String,
    enum: ["draft", "open", "closed"],
    default: "open",
  },
},{timestamps:true});

jobSchema.index({company:1, status:1})

export const JobModel = mongoose.model("Job", jobSchema);