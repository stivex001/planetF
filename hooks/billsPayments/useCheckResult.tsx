import { BuyCheckerFormValues, BuyDataFormValues } from '@/models/auth';
import { buyChecker } from '@/mutation/buyChecker';
import { ApiResponse, BackendError } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useCheckResult = () =>
  useMutation<ApiResponse, BackendError, BuyCheckerFormValues, () => void>({
    mutationFn: (props) => buyChecker(props),
  });