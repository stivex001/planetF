import { BuyTvFormValues } from '@/models/auth';
import { buyTv } from '@/mutation/buyTv';
import { ApiResponse, BackendError } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useBuyTv = () =>
  useMutation<ApiResponse, BackendError, BuyTvFormValues, () => void>({
    mutationFn: (props) => buyTv(props),
  });