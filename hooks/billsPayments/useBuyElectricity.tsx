import { BuyElectricityFormValues } from '@/models/auth';
import { buyElectricity } from '@/mutation/buyElectricity';
import { ApiResponse, BackendError } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useBuyElectricity = () =>
  useMutation<ApiResponse, BackendError, BuyElectricityFormValues, () => void>({
    mutationFn: (props) => buyElectricity(props),
  });