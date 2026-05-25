import { generateResume } from "../services/ai.service.js";
import resumeTemplate from "../Templates/resumeTemplate.js";
import generatePDF from "../services/generatePDF.js";
import uploadPDF from "../services/uploadPDF.js";
import { ResumeModel } from "../Models/resume.model.js";

/**
 * @description controller to generate resume based on user form data
 *
 */
export const createResume = async (req, res) => {
  try {
    //getting resume data from the frontend
    const resumeData = req.body;
    const userName = resumeData.fullName;
    console.log("1. Got resume data:", !!resumeData);

    //getting response form gemini ai
    const resumeByAi = await generateResume(resumeData);

    console.log("2. AI response received:", !!resumeByAi);
    // console.log(resumeByAi);
    const ResumeTitle = resumeByAi.title;

    //generating HTML for PDF format
    const html = resumeTemplate(resumeByAi);
    console.log("3. HTML generated:", html.length, "chars");
    //generate pdf buffer and thumbnailBuffer
    const { pdfBuffer, thumbnailBuffer } = await generatePDF(html);
    console.log("4. PDF buffer size:", pdfBuffer?.length);

    //upload to cloudinary
    const { resumeUrl, publicId, thumbnailUrl, thumbnailPublicId } =
      await uploadPDF(pdfBuffer, thumbnailBuffer, userName);
    // await uploadPDF(pdfBuffer, userName, thumbnailBuffer);
    console.log("5. Cloudinary upload done:", resumeUrl);
    // console.log(uploaded);

    //save to DB
    const resume = await ResumeModel.create({
      user: req.user.id,
      title: ResumeTitle,
      resumeUrl,
      publicId,
      thumbnailPublicId,
      thumbnailUrl,
      atsScore: resumeByAi.atsScore,

      ...resumeByAi,
    });
    // Send response to Frontend
    res
      .status(201)
      .json({ message: "Resume Generated Successfully", resume: resume });
  } catch (error) {
    if (error.status === 429) {
      return res.status(429).json({
        message: "AI service is busy. Please try again in a few seconds",
      });
    }
    console.log("error in createResume", error);
    res.status(500).json({
      message: "Failed to create Resume. Please Try Again in some time",
      success: false,
    });
  }
};

/**
 * @description controller to get the specific resume by id
 */
export const getResumeById = async (req, res) => {
  const { resumeId } = req.params;

  try {
    const resumeById = await ResumeModel.findOne({
      _id: resumeId,
      user: req.user.id,
    });
    if (!resumeById) {
      return res.status(401).json({
        message: "No resume found for this specification",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Resume Fetched successfully",
      success: true,
      resumeById,
    });
  } catch (error) {
    console.log("Error in getResumeById", error.message);
    return res
      .status(401)
      .json({ message: "Failed to fetched User Resume", success: false });
  }
};

/**
 * @description controller to get all resume for the specific user
 */
export const getAllResume = async (req, res) => {
  try {
    const allResume = await ResumeModel.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    if (!allResume.length) {
      return res
        .status(200)
        .json({ message: "No resumes found", success: true, allResume: [] });
    }
    return res.status(201).json({
      message: "Successfully Fetched all resume for the user",
      allResume,
    });
  } catch (error) {
    console.log("error in all resume", error.message);
    res.status(401).json({ message: "Failed to fetch resume", success: false });
  }
};

/**
 * @description
 */
export const deleteResumeById = async (req, res) => {
  const { resumeId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
      return res.status(400).json({
        message: "Invalid resume ID",
        success: false,
      });
    }
    const resume = await ResumeModel.findOneAndDelete({
      _id: resumeId,
      user: req.user.id,
    });

    if (!resume) {
      return res
        .status(400)
        .json({ message: "Resume not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Resume Deleted Successfully", resume, success: true });
  } catch (error) {
    console.log("error in delete resume by id", error.message);
    res
      .status(401)
      .json({ message: "Failed to delete resume", success: false });
  }
};
