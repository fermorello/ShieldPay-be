import { z } from 'zod';


export const signInSchema: any = z.object({
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'Must be an email',
    })
    .email(),
  password: z.string(),
});

export type SignInDTO = z.infer<typeof signInSchema>;
