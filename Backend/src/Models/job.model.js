import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({

 company:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"Company",
   required:true
 },

 postedBy:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"User",
   required:true
 },

 title:{
   type:String,
   required:true
 },

 description:{
   type:String,
   required:true
 },

 skills:[
   {
    type:String
   }
 ],

 location:String,

 workMode:{
   type:String,
   enum:["REMOTE","HYBRID","ONSITE"],
   default:"ONSITE"
 },

 employmentType:{
   type:String,
   enum:[
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
    "INTERNSHIP"
   ],
   default:"FULL_TIME"
 },

 experienceLevel:{
   type:String,
   enum:[
    "ENTRY",
    "JUNIOR",
    "MID",
    "SENIOR",
    "LEAD"
   ]
 },

 salary:{
   min:Number,
   max:Number,
   currency:{
     type:String,
     default:"USD"
   }
 },

 status:{
   type:String,
   enum:[
    "DRAFT",
    "OPEN",
    "CLOSED"
   ],
   default:"OPEN"
 },

 expiresAt:Date

},{timestamps:true});


jobSchema.index({
 company:1,
 status:1
});

jobSchema.index({
 title:"text",
 description:"text",
 skills:"text"
});
export const JobModel = mongoose.model("Job", jobSchema);