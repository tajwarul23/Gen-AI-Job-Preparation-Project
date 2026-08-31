import { z } from "zod";

export const updateCompanySchema = z.object({
  companyName: z.string().min(1, "Company name is required"),

  aboutCompany: z
    .string()
    .min(10, "About company must be at least 10 characters")
    .max(1000, "About company cannot exceed 1000 characters"),

  industry: z.string().min(1, "Choose one industry"),

  country: z.string().min(1, "Country is required"),
});
