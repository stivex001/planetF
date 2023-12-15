import { CGFormValues } from "@/models/auth";
import { ApiResponse, BackendError } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { buyBundles } from "./buyBundles";


export const useBuyBundles = () =>
  useMutation<ApiResponse, BackendError, CGFormValues, () => void>({
    mutationFn: (props) => buyBundles(props),
  });
