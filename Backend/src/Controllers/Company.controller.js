import { CompanyModel } from "../Models/company.model.js";
import { JobModel } from "../Models/job.model.js";
import { userModel } from "../Models/user.model.js";
import {
  deleteFromCloudinary,
  uploadCompanyLogo,
} from "../services/uploadPDF.js";
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
    logoPublicId: uploadedLogo.publicId,
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
    .json(
      new ApiResponse(201, company, "Company Created Successfully", {
        updatedUser,
      }),
    );
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
 * @description join the company with an invited link
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

/**
 * @name updateCompanyController
 * @description update the company info
 * @access Private (company admin only)
 */
export const updateCompanyController = asyncHandler(async (req, res) => {
  const { companyName, aboutCompany, country, industry } = req.body;

  const company = await CompanyModel.findById(req.user.company);

  if (!company) {
    throw new ApiError(404, "Company not found");
  }
  if (company.createdBy.toString() !== req.user.id.toString()) {
    throw new ApiError(403, "You are not authorized to update this company");
  }
  const normalizedCompanyName = companyName?.trim();
  const companyNameChanged =
    normalizedCompanyName !== undefined &&
    normalizedCompanyName !== company.companyName;

  if (normalizedCompanyName !== undefined) {
    company.companyName = normalizedCompanyName;
  }

  if (aboutCompany !== undefined) {
    company.aboutCompany = aboutCompany;
  }

  if (country !== undefined) {
    company.country = country;
  }

  if (industry !== undefined) {
    company.industry = industry;
  }

  await company.save();

  if (companyNameChanged) {
    await JobModel.updateMany(
      {
        company: company._id,
      },
      {
        $set: {
          companyName: company.companyName,
        },
      },
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { company }, "Company updated successfully"));
});

/**
 * @name updateCompanyLogoController
 * @description update the company logo
 * @access Private (company admin only)
 */
export const updateCompanyLogoController = async (req, res) => {
  try {
    const logo = req.file;
    if (!req.file) {
      throw new ApiError(401, "Logo file is required");
    }

    if (!req.file.mimetype.startsWith("image/")) {
      throw new ApiError(400, "Only image files are allowed");
    }

    const company = await CompanyModel.findById(req.user.company);

    if (!company) {
      throw new ApiError(404, "Company not found");
    }

    if (String(company.createdBy) !== String(req.user.id)) {
      throw new ApiError(403, "You are not authorized to update this company");
    }

    const newLogo = await uploadCompanyLogo(logo.buffer, company.companyName);
    const oldLogoPublicId = company.logoPublicId;
    company.logoUrl = newLogo.logoUrl;
    company.logoPublicId = newLogo.publicId;
    await company.save();
    if (oldLogoPublicId) {
      deleteFromCloudinary(oldLogoPublicId).catch((err) => {
        console.log("Error deleting old logo", err.message);
      });
    }
    return res
      .status(201)
      .json(new ApiResponse(201, company, "Logo updated successfully"));
  } catch (error) {
    console.log("Error on updating logo", error.message);
    throw new ApiError(501, "Error on updating logo");
  }
};

/**
 * @name getCompanyController
 * @description get Company info
 * @access Private (company_admin || recruiter )
 */

export const getCompanyController = asyncHandler(async (req, res) => {
  if (!req.company) {
    return res.status(404).json({
      message: "Company not found",
    });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, req.company, "Company data fetched successfully"),
    );
});
