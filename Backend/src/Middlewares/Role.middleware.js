import { JobModel } from "../Models/job.model.js";
import ApiError from "../Utils/ApiError.js";

export const requireCompanyScope = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await JobModel.findById(jobId);

    if (!job) {
      throw new ApiError(404, "Job Not found");
    }
    if (String(job.company) !== String(req.user.company)) {
      throw new ApiError(403, "Not authorized for this job");
    }
    

    req.job = job;
    next();
  } catch (error) {
    console.log("Error in requireCompanyScope", error.message);
    if (error instanceof ApiError) {
      // return the status and message you set above
      return res
        .status(error.statusCode)
        .json({ message: error.message, success: false });
    }

    // unexpected errors
    return res
      .status(500)
      .json({ message: "Error checking company scope", success: false });
  }
};
