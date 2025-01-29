import { z } from 'zod';


export const createUserSchema: any = z.object({
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'Must be an email',
    })
    .email(),
  password: z.string(),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
