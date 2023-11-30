import { useMutation } from "@tanstack/react-query";
import { SigninFormValues } from "@/models/auth";
import { ApiResponse, BackendError } from "@/types";
import { signinWithEmail } from "@/mutation/signinWithEmail";

export const useEmailSignin = () =>
  useMutation<ApiResponse, BackendError, SigninFormValues, () => void>({
    mutationFn: (props) => signinWithEmail(props),
  });
