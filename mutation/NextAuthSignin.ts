import { SigninFormValues } from '@/models/auth';
import { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';

export const nextAuthSignin = async ({ user_name, password }: SigninFormValues) => {
  try {
    const response = await signIn('credentials', {
      user_name,
      password,
      redirect: false,
    });
    if (response?.ok) {
      return { success: true };
    } else throw new Error(response?.error || 'An error occured Please retry');
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.error?.message);
    } else if (error instanceof Error) {
      throw error;
    } else throw new Error('Error occurred while logging in');
  }
};
