import { useMutation } from '@tanstack/react-query';
import { ForgotPasswordFormOneValues } from '@/models/auth';
import { ApiResponse, BackendError } from '@/types';
import { requestPasswordReset } from '@/mutation/requestPasswordReset';

export const useRequestPasswordReset = () =>
  useMutation<
    ApiResponse,
    BackendError,
    ForgotPasswordFormOneValues,
    () => void
  >({
    mutationFn: (props) => requestPasswordReset(props),
  });
