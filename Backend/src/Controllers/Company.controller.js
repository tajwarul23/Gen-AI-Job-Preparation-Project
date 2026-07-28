import { CompanyModel } from "../Models/company.model.js";
import { userModel } from "../Models/user.model.js";
import { uploadCompanyLogo } from "../services/uploadPDF.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/asyncHandler.js";
import jwt from "jsonwebtoken";
/**
 * @name createCompanyController
 * @description RECRUITER only, creator become company_admin
 * @access Private
 */
export const createCompanyController = asyncHandler(async (req, res) => {
  const { companyName, aboutCompany, industry, country } = req.body;
  const logo = req.file;

  if (
    !companyName?.trim() ||
    !aboutCompany?.trim() ||
    !logo ||
    !industry?.trim() ||
    !country?.trim()
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedCompany = await CompanyModel.findOne({ companyName });
  if (existedCompany) {
    throw new ApiError(400, "Company already exist.");
  }
  if (req.user.company) {
    throw new ApiError(
      401,
      "You're already part of a company. Leave it first to create a new one.",
    );
  }
  const uploadedLogo = await uploadCompanyLogo(logo.buffer, companyName);
  const company = await CompanyModel.create({
    companyName,
    aboutCompany,
    logoUrl: uploadedLogo.logoUrl,
    industry,
    country,
    createdBy: req.user.id,
  });
  const updatedUser = await userModel.findByIdAndUpdate(
    req.user.id,
    {
      role: "company_admin",
      company: company._id,
    },
    { new: true },
  );

  
  

  const newToken = jwt.sign(
    {
      id: updatedUser._id,
      userName: updatedUser.userName,
      role: updatedUser.role,
      company: updatedUser.company,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
  return res
    .status(201)
    .json(new ApiResponse(201, company, "Company Created Successfully"));
});

/**
 * @name generateInviteController
 * @description company_admin generates a shareable invite link for their company
 * @access Private (company_admin)
 */
export const generateInviteController = asyncHandler(async (req, res) => {
  let inviteLink;
  const inviteToken = jwt.sign(
    {
      companyId: req.user.company,
      type: "company_invite",
    },
    process.env.INVITATION_TOKEN_SECRET,
    { expiresIn: "1d" },
  );

  inviteLink = `http://localhost:3000/api/company/join?token=${inviteToken}`;
  //but later we have to send the frontend link frontend/join?token=abc123
  if (inviteLink === "") {
    throw new ApiError(500, "failed to generate invite link");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, inviteLink, "Your invite link"));
});

/**
 * @name joinCompanyController
 * @description RECRUITER only, creator become company_admin
 * @access Firebase auth needed
 */
export const joinCompanyController = asyncHandler(async (req, res) => {
  const { token } = req.query;
  if (!token) throw new ApiError(400, "Invite token is required");
  let decoded = jwt.verify(token, process.env.INVITATION_TOKEN_SECRET);
  if (!decoded) throw new ApiError(400, "Invalid or expired invite link");
  if (decoded.type !== "company_invite")
    throw new ApiError(400, "Invalid invite token");

  const company = await CompanyModel.findById(decoded.companyId);
  if (!company) throw new ApiError(404, "Company not found");
  const updatedUser = await userModel.findByIdAndUpdate(
    req.user.id,
    {
      role: "recruiter",
      company: company._id,
    },
    { new: true },
  );

  const newToken = jwt.sign(
    {
      id: updatedUser._id,
      userName: updatedUser.userName,
      role: updatedUser.role,
      company: updatedUser.company,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, `Joined ${company.name} successfully`),
    );
});

//updateCompanyController => when a company update's their name we have to update all their job opening's company name as we are storing company name on jobModel