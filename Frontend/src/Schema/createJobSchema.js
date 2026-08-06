import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().trim().min(1, "Job title is required"),

  description: z
    .string()
    .trim()
    .min(10, "Job description is too short")
    .max(5000, "Maximum 5000 characters allowed"),

  skills: z
    .array(z.string().trim().min(1, "Skill cannot be empty"))
    .min(1, "At least one skill is required"),

  location: z.string().trim().min(1, "Location is required"),

  workMode: z.enum(["REMOTE", "HYBRID", "ONSITE"]),

  employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"]),

  experienceLevel: z.enum(["ENTRY", "JUNIOR", "MID", "SENIOR", "LEAD"]),

  salary: z
    .object({
      salaryMin: z.coerce
        .number()
        .nonnegative("Minimum salary cannot be negative")
        .positive("Minimum Salary must be greater than 0"),

      salaryMax: z.coerce
        .number()
        .nonnegative("Maximum salary cannot be negative")
        .positive("Maximum Salary must be greater than 0"),

      currency: z.string(),
    })
    .refine((data) => data.salaryMin <= data.salaryMax, {
      message: "Minimum salary cannot be greater than maximum salary",
      path: ["salaryMax"],
    }),

  status: z.enum(["DRAFT", "OPEN", "CLOSED"]),

  vacancy: z.coerce
    .number()
    .int("Vacancy must be an integer")
    .positive("Vacancy must be greater than 0"),

  deadline: z.coerce.date().refine((date) => date.getTime() > Date.now(), {
    message: "Deadline must be in the future",
  }),
});

export const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "BDT", name: "Bangladeshi Taka" },
  { code: "INR", name: "Indian Rupee" },
  { code: "PKR", name: "Pakistani Rupee" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "AED", name: "UAE Dirham" },
  { code: "SAR", name: "Saudi Riyal" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "CHF", name: "Swiss Franc" },
];
