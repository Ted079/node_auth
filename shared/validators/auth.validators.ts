import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(4, "The name must contain at least 4 characters.")
    .max(50, "The name must not exceed 50 characters")
    .regex(
      /^[a-яА-Я\s'-]+$/i,
      "The name can only contain letters, spaces, and hyphens",
    ),

  email: z.email("Incorrect email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type SignupError = z.ZodError<SignupFormData>;

export const loginSchema = z.object({
  email: z.email("Incorrect email address"),
  password: z.string().min(1, "Password is required"),
});

export const updateUserSchema = z.object({
  name: z.string().trim().min(4).max(20).optional(),
  email: z.email().optional(),
  bio: z.string().max(500).optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type LoginError = z.ZodError<LoginFormData>;
