import { SignUpFormValues } from '@/models/auth';
import { signUp } from '@/mutation/SignUp';
import { ApiResponse, BackendError } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useSignup = () =>
  useMutation<ApiResponse, BackendError, SignUpFormValues, () => void>({
    mutationFn: (props) => signUp(props),
  });