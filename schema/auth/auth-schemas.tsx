import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(1, "Please enter your password."),
});

export const mfaSchema = z.object({
  code: z
    .string()
    .regex(/^\d{6}$/, "Enter the 6-digit verification code"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type MfaFormValues = z.infer<typeof mfaSchema>;