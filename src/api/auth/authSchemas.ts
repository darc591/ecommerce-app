import { z } from 'zod';

export enum UserType {
  CUSTOMER,
  ADMIN,
}

export const signupBody = z.object({
  firstName: z.string().max(60),
  lastName: z.string().max(60),
  email: z.string().email(),
  password: z.string().min(6),
  inviteCode: z.string().optional(),
  userType: z.nativeEnum(UserType),
});

export const loginBody = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignUpBody = z.infer<typeof signupBody>;

export type LoginBody = z.infer<typeof loginBody>;
