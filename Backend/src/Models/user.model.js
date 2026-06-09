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
},{timestamps:true});

export const userModel = mongoose.model("users", userSchema);
