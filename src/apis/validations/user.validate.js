import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email().required,
  password: z.string().min(8).required,
});

export const registerUserSchema = z.object({
  email: z.string().email().required,
  password: z.string().min(8).require,
  confirmPassword: z.string().min(8).required,
});