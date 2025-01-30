import { z } from 'zod';

export const updateWalletSchema: any = z.object({
  tag: z
    .string({
      invalid_type_error: 'Must be a string',
    })
    .optional(),
  chain: z.string().optional(),
  address: z
    .string()
    .refine(
      (address) => {
        const regex = /^0x[a-fA-F0-9]{40}$/;
        return regex.test(address);
      },
      {
        message: 'The wallet address is not correct.',
      }
    )
    .optional(),
});

export type UpdateWalletDTO = z.infer<typeof updateWalletSchema>;
