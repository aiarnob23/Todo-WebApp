import { z } from "zod";

const newUserValidation = z.object({
  body: z.object({
    userId: z.string(),
    name: z.string(),
    email: z.string(),
    password: z.string().optional(),
  }),
});

export const userValidations = {
  newUserValidation,
};
