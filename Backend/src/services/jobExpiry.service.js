import { JobModel } from "../Models/job.model.js";

export const closeExpiredJobs = async () => {
  try {
    const result = await JobModel.updateMany(
      {
        status: "OPEN",
        deadline: { $lt: new Date() },
      },
      {
        $set: {
          status: "CLOSED",
        },
      },
    );
    console.log(
      `Job expiry check completed. ${result.modifiedCount} jobs closed.`,
    );
  } catch (error) {
    console.log("Error closing expired jobs", error.message);
  }
};
