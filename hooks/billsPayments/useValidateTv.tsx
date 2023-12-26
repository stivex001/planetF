import { ValidateTvFormValues } from "@/models/auth";
import { validateTv } from "@/mutation/validateTv";
import { ApiResponse, BackendError } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useValidateTv = () =>
  useMutation<ApiResponse, BackendError, ValidateTvFormValues, () => void>({
    mutationFn: (props) => validateTv(props),
  });
