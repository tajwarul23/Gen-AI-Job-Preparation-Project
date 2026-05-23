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
    
    .refine(
      (val) =>
        !val ||
        val === "" ||
        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(val),
      "Enter a valid portfolio URL",
    ),
  linkedinUrl: z
    .string()
    
    .refine(
      (val) =>
        !val ||
        val === "" ||
        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(val),
      "Enter a valid linkedin profile URL",
    ),
  githubProfileLink: z
    .string()
    
    .refine(
      (val) =>
        !val ||
        val === "" ||
        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(val),
      "Enter a valid github profile URL",
    ),
  summary: z
    .string()
    .min(30, "Summary should be at least 30 characters")
    .max(500, "Keep your summary under 500 characters"),

  // Work Experience — repeatable
  experiences: z
    .array(
      z
        .object({
          jobTitle: z.string(),
          company: z.string(),
          duration: z.string(),
          expLocation: z.string(),
          achievements: z.string(),
        })
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
    )
    .optional(),

  // Education 
  degree: z.string().min(2, "Degree & major is required"),
  university: z.string().min(2, "University name is required"),
  skills: z.array(
    z.object({
      name: z.string().min(1, "Mention at least one skill"),
      description: z
        .string()
        .min(10, "Describe your experience with this skill")
        .max(300, "Description is too long"),
    }),
  ).min(1, "Add at least one skill"),
  certifications: z.array(
  z.object({
    name: z.string(),
    issuer: z.string(),
    issueDate: z.string(),
    credentialUrl: z.string().url(),
  })
).optional(),
  projects: z.array(
    z.object({
      name: z.string().min(1, "Project name is required"),

      githubLink: z
        .string()
        .min(1, "GitHub link is required")
        .url("Enter a valid GitHub repository URL"),

      liveLink: z
        .string()
        .min(1, "Live link is required")
        .url("Enter a valid Live URL"),

      description: z.string().min(1, "Description is required"),
    }),
  ),
});
