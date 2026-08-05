import { z } from "zod";

export const createCompanySchema = z.object({
  companyName: z.string().min(1, "Company name is required"),

  aboutCompany: z.string().min(1, "About company is required"),

  industry: z.string().min(1, "Choose one industry"),

  country: z.string().min(1, "Country is required"),

logo: z.preprocess(
    (value) => {
      if (value instanceof FileList) {
        return value.item(0); // or value[0]
      }
      return value;
    },
    z.instanceof(File, {
      message: "Logo is required",
    })
      .refine((file) => file.type.startsWith("image/"), {
        message: "Only image files are allowed",
      })
      .refine((file) => file.size <= 2 * 1024 * 1024, {
        message: "File size must be under 2MB",
      })
  ),

});