import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string(),
  lastName: z.string(),
});

export const createUserValidationSchema = z.object({
  body: z.object({
    name: createUserNameValidationSchema,
    email: z.string().email(),
    password: z.string().max(20).optional(),
  }),
});

export const userValidations = {
  createUserValidationSchema,
};
