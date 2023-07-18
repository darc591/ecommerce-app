import { z } from 'zod';

const createStoreBody = z.object({
  storeName: z.string().max(60),
  logoImg: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateStoreBody = z.infer<typeof createStoreBody>;
