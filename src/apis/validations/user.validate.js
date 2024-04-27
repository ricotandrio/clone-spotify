import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(3),
  date_of_birth: z.date(),
});

export const validateExtractor = (parsed) => {
  if (!parsed.success) {
    const error = parsed.error;
    let errors = {};
    for (const issue of error.issues) {
      errors = {
        ...errors,
        [issue.path[0]]: issue.message,
      };
    }

    // console.log(`errors exists`);
    return errors;
  } else {
    // console.log(`errors safe`);
    return true;
  }
};
