import { BuyAirtimeFormValues } from '@/models/auth';
import { buyAirtime } from '@/mutation/buyAirtime';
import { ApiResponse, BackendError } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useBuyAirtime = () =>
  useMutation<ApiResponse, BackendError, BuyAirtimeFormValues, () => void>({
    mutationFn: (props) => buyAirtime(props),
  });