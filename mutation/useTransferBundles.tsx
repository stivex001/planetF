import { CGFormTransferValues } from "@/models/auth";
import { ApiResponse, BackendError } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { buyBundlesWithTransfer } from "./buyBundlesWithTransfer";

export const useTransferBundles = () =>
  useMutation<ApiResponse, BackendError, CGFormTransferValues, () => void>({
    mutationFn: (props) => buyBundlesWithTransfer(props),
  });
