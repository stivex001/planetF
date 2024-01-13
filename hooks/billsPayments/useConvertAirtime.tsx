import { ConvertAirtimeFormValues } from '@/models/auth';
import { buyAirtime } from '@/mutation/buyAirtime';
import { convertAirtime } from '@/mutation/convertAirtime';
import { ApiResponse, BackendError } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useConvertAirtime = () =>
  useMutation<ApiResponse, BackendError, ConvertAirtimeFormValues, () => void>({
    mutationFn: (props) => convertAirtime(props),
  });