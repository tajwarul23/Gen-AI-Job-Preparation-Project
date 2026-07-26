import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
    index: true
  },
  password: {
    type: String,
  },
  firebaseUid: { type: String },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  verificationTokenExpiry: { type: Date },

  role:{
    type: String,
    enum:["candidate","recruiter", "company_admin"],
    default:"candidate"
  },

  company:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
  }
},{timestamps:true});

export const userModel = mongoose.model("users", userSchema);
