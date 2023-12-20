import { BuyDataFormValues } from '@/models/auth';
import { buyAirtime } from '@/mutation/buyAirtime';
import { buyData } from '@/mutation/buyData';
import { ApiResponse, BackendError } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useBuyData = () =>
  useMutation<ApiResponse, BackendError, BuyDataFormValues, () => void>({
    mutationFn: (props) => buyData(props),
  });