
import { useToken } from "../auth/useToken";
import { useQuery } from "@tanstack/react-query";
import { Commissions } from "@/types/transaction";
import { getCommissionRecord } from "@/query/getCommissionRecord";


export const useCommissionRecord = () => {
  const { token } = useToken();

  return useQuery<unknown, Error, Commissions>({
    enabled: !!token,
    queryFn: () => getCommissionRecord(),
    queryKey: ["transaction"],
    staleTime: 1000 * 60 * 5,
  });
};
