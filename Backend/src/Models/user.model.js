import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    
    required: true,
  },
  email: {
    type: String,
    unique: [true, "Account already exists with this email address"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  verificationTokenExpiry: { type: Date },
});

export const userModel = mongoose.model("users", userSchema);
