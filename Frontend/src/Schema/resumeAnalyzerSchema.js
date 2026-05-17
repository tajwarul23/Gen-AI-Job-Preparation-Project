import { z } from "zod";

export const resumeAnalyzerSchema = z.object({
  selfDescription: z
    .string()
    .min(50, "Please write at least 50 characters")
    .max(1000, "Maximum 1000 characters allowed"),

  jobDescription: z
    .string()
    .min(100, "Job description is too short")
    .max(5000, "Maximum 5000 characters allowed"),

  resume: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Resume is required",
    })
    .refine((file) => file?.type === "application/pdf", {
      message: "Only PDF files are allowed",
    })
    .refine((file) => file?.size <= 3 * 1024 * 1024, {
      message: "File size must be under 3MB",
    }),
});
