import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export const userValidations = {
  userValidationSchema,
};
