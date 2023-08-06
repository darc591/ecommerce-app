import { UserType } from 'stores/authStore/authStore';
import { z } from 'zod';

export const signupBody = z.object({
  first_name: z.string().max(60),
  last_name: z.string().max(60),
  email: z.string().email(),
  password: z.string().min(6),
  invite_code: z.string().optional(),
  type_: z.nativeEnum(UserType),
});

export const loginBody = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignUpBody = z.infer<typeof signupBody>;

export type LoginBody = z.infer<typeof loginBody>;
