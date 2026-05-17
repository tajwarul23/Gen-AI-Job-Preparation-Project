import { z } from "zod";
export const registerSchema = z
  .object({
    userName: z.string().min(3, "Username must be at least 3 characters"),

    email: z.string().email("Invalid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be less then 21 characters")
      .regex(/[A-Z]/, "Password must include uppercase letter")
      .regex(/[a-z]/, "Password must include lowercase letter")
      .regex(/[0-9]/, "Password must include number")
      .regex(
        new RegExp("[\\-'/~!#*$@_%+=.,^&(){}\\[\\]|;:\"<>?]"),
        "Password must include special character",
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
