const { z } = require("zod");

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});