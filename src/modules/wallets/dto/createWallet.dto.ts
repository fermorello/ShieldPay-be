import { z } from 'zod';

export const createWalletSchema: any = z.object({
  tag: z
    .string({
      invalid_type_error: 'Must be a string',
    })
    .optional(),
  chain_id: z.number({
    required_error: 'chain_id is required',
  }),
  address: z
    .string({
      required_error: 'Wallet address is required',
    })
    .refine(
      (address) => {
        const regex = /^0x[a-fA-F0-9]{40}$/;
        return regex.test(address);
      },
      {
        message: 'The wallet address is not correct.',
      }
    ),
});

export type CreateWalletDTO = z.infer<typeof createWalletSchema>;
