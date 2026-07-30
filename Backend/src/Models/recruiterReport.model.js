
import mongoose from "mongoose";

const strengthSchema = new mongoose.Schema({
    area: String,
    explanation:String
}, {_id:false});

const weaknessesSchema = new mongoose.Schema({
    area: String,
    explanation: String
}, {_id: false});

const skillGapsSchema = new mongoose.Schema({
    skill: String,
    severity:{
        type:String,
        enum:[
            "low",
            "medium",
            "high"
        ]
    }
}, {_id: false})

const recruiterReportSchema = new mongoose.Schema({
    title:{
        type:String
    },

    application:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: true
    },

    candidate:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
  },

   resume:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Resume",
    required:true
  },

  matchScore:{
    type:Number,
    min:0,
    max:100
  },

   hiringRecommendation:{
    type:String,
    enum:[
      "strong_hire",
      "hire",
      "consider",
      "weak_fit",
      "reject"
    ]
  },
  executiveSummary:{
    type:String
  },

   strengths:[
    strengthSchema
  ],


  weaknesses:[
    weaknessesSchema
  ],


  skillGaps:[
    skillGapsSchema
  ],

  
}, {timestamps:true});

export const RecruiterReportModel = mongoose.model("RecruiterReport", recruiterReportSchema)