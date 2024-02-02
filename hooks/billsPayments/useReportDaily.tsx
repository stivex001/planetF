import { ReportFormValues } from "@/models/auth";
import { fetchDailyReprt } from "@/mutation/fetchDailyReport";
import { ApiResponse, BackendError } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useReportDaily = () =>
  useMutation<ApiResponse, BackendError, ReportFormValues, () => void>({
    mutationFn: (props) => fetchDailyReprt(props),
  });
