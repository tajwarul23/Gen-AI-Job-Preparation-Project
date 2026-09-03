import { closeExpiredJobs } from "./jobExpiry.service.js";
import cron from "node-cron";
export const startJobExpireCron = async () => {
  await closeExpiredJobs();

  cron.schedule("59 23 * * *", closeExpiredJobs);
  console.log("Job expiry cron started");
};
