import { z } from "zod";

export const resumeBuilderSchema = z.object({
  // Personal Info
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name is too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[+\d\s\-().]+$/, "Only digits, spaces, +, -, () allowed"),
  location: z
    .string()
    .min(2, "Location is required")
    .max(100, "Location is too long"),

  portfolioUrl: z
    .string()
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")),
  linkedinUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  githubProfileLink: z
    .string()
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")),
  summary: z
    .string()
    .min(30, "Summary should be at least 30 characters")
    .max(500, "Keep your summary under 500 characters"),

  // Work Experience — repeatable
  experiences: z.array(
    z
      .object({
        jobTitle: z.string(),
        company: z.string(),
        duration: z.string(),
        expLocation: z.string(),
        achievements: z.string(),
      })
      .optional()
      .refine(
        (exp) => {
          const hasAny = Object.values(exp).some((v) => v && v.trim() !== "");
          if (!hasAny) return true; // empty entry = skip validation
          // if any field filled, require all
          return (
            exp.jobTitle &&
            exp.company &&
            exp.duration &&
            exp.expLocation &&
            exp.achievements
          );
        },
        {
          message: "Complete all fields for this position or leave it empty",
        },
      ),
  ),

  // Education
  education: z
    .array(
      z.object({
        degree: z.string().min(1, "Degree is required"),
        institution: z.string().min(1, "Institution is required"),
        result: z.string().optional(),
      }),
    )
    .min(1, "Add at least one education entry"),
  skills: z
    .array(
      z.object({
        name: z.string().min(1, "Skill name is required"),
        description: z
          .string()
          .min(10, "Describe your experience with this skill")
          .max(300, "Description is too long"),
      }),
    )
    .min(1, "List at least 1 skill"),
  certifications: z
    .array(
      z.object({
        name: z.string().min(1, "Certification name is required"),
        issuer: z.string().min(1, "Issuer is required"),
        issueDate: z.string().min(1, "Issue date is required"),
        credentialUrl: z
          .string()
          .url("Enter a valid URL")
          .optional()
          .or(z.literal("")),
      }),
    )
    .optional(),
  projects: z
    .array(
      z.object({
        name: z.string().min(1, "Project name is required"),

        githubLink: z
          .string()
          .url("Enter a valid URL")
          .optional()
          .or(z.literal("")),
        liveLink: z
          .string()
          .url("Enter a valid URL")
          .optional()
          .or(z.literal("")),
        description: z.string().min(1, "Description is required"),
      }),
    )
    .optional(),
});
